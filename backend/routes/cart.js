const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const product = require('../middleware/authMiddleware')
const Cart = require('../models/Cart')

router.get('/', protect, async (req, res) => {
    try {
        const Cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
        if(!cart) {
            return res.json({ items: [] })
        }
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/add', protect, async (req, res) => {
    const { productId, quantity, size } = req.body;

    try {
        const product = await Product.findById(productId)
        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        if(product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficiemt stock' })
        }

        let cart = await Cart.findOne({ user: req.user._id })

        if(!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity, size }]
            })
        } else {
            const existingItem = cart.items.find(
                item => item.product.toString() === productId && item.size === size
            )

            if(existingItems) {
                existingItem.quantity += quantity
            } else {
                cart.items.push({ product: productId, quantity, size })
            }

            await cart.save()
        }

        await cart.populate('items.product')
        res.json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/update/:itemId', protect, async (req, res) => {
    const { quantity } = req.body

    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if(!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        const item = cart.items.id(req.params.itemId)
        if (!item) {
        return res.status(404).json({ message: 'Item not found in cart' })
        }

        item.quantity = quantity
        await cart.save()

        await cart.populate('items.product')
        res.json(cart)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/remove/:itemId', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
        }

        cart.items = cart.items.filter(
        item => item._id.toString() !== req.params.itemId
        )

        await cart.save()
        await cart.populate('items.product')
        res.json(cart)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/clear', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
        }

        cart.items = []
        await cart.save()
        res.json({ message: 'Cart cleared' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router