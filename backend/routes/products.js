const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Get all products
router.get('/', async(req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category })
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get single product
router.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(400).json({ message: 'Product not found' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router