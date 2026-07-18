const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const crypto = require('crypto')
const protect = require('../middleware/authMiddleware')
const Order = require('../models/Order')
const Cart =  require('../models/Cart')
const User = require('../models/User')
const sendOrderConfirmation = require('../Utils/sendEmail')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

router.post('/create-order', protect, async(req, res) => {
    try {
        const { amount } = req.body

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpay.orders.create(options)
        res.json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/verify', protect, async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        shippingAddress
    } = req.body

    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex')

        if (expectedSignature != razorpay_signature) {
            return res.status(400).json({ message: 'Payment verification failed' })
        }

        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

        if(!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' })
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            size: item.size,
            price: item.product.price
        }))

        const totalAmount = orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        )

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            totalAmount,
            paymentMethod: 'online',
            isPaid: true,
            paidAt: Date.now()
        })

        cart.items = []
        await cart.save()

        try {
            const user = await User.findById(req.user._id)
            await sendOrderConfirmation(user.email, order, user.name)
        } catch (emailError) {
            console.error('Email failed:', emailError.message)
        }

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router