const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const protect = require('../middleware/authMiddleware')

// Place order
router.post('/', protect, async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body

  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    // Build order items from cart
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      size: item.size,
      price: item.product.price
    }))

    // Calculate total
    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity, 0
    )

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
      paymentMethod: paymentMethod || 'cod'
    })

    // Clear cart after order placed
    cart.items = []
    await cart.save()

    res.status(201).json(order)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get my orders
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product')

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Make sure the order belongs to the logged in user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router