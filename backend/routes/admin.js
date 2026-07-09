const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Order = require('../models/Order')
const User = require('../models/User')
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
const { upload, cloudinary } = require('../config/cloudinary')

router.get('/products', protect, admin, async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/products', protect, admin, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, sizes, stock } = req.body

        const product = await Product.create({
            name, 
            description,
            price,
            category,
            sizes: sizes ? sizes.split(',').map(s => s.trim()) : [],
            stock,
            images: req.file ? [req.file.path] : []
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/products/:id', protect, admin, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, sizes, stock } = req.body
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        if(req.file && product.images[0]) {
            const publicId = product.images[0].split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(`fabery-collections/${publicId}`)
        }

        product.name = name || product.name
        product.description = description || product.description
        product.price = price || product.price
        product.category = category || product.category
        product.sizes = sizes ? sizes.split(',').map(s => s.trim()) : product.sizes
        product.stock = stock || product.stock
        if (req.file) product.images = [req.file.path]

        const updated = await product.save()
        res.json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/products/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
         // Delete image from Cloudinary
        if (product.images[0]) {
        const publicId = product.images[0].split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(`fabery-collections/${publicId}`)
        }

        await product.deleteOne()
        res.json({ message: 'Product deleted' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/orders', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find()
        .populate('user', 'name email')
        .populate('items.product', 'name price')
        .sort({createdAt: -1})
       res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/orders/:id', protect, admin, async (req, res) => {
    try {
        const { status } = req.body
        const order = await Order.findById(req.params.id)

        if(!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        order.status = status
        if(status === 'delivered') {
            order.isPaid = true
            order.paidAt = Date.now()
        }

        const updated = await order.save()
        res.json(updated)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/users', protect, admin, async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.isAdmin) {
      return res.status(400).json({ message: 'Cannot delete admin user' })
    }

    await user.deleteOne()
    res.json({ message: 'User deleted' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router