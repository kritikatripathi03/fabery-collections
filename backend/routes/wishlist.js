const express = require('express')
const router = express.Router()
const Wishlist = require('../models/Wishlist')
const protect = require('../middleware/authMiddleware')

router.get('/', protect, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.poduct')
        if(!wishlist) {
            return res.json({ items: [] })
        }
        res.json(wishlist)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/add', protect, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id })
        if(!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user._id,
                items: [{ product: productId }]
            })
        } else {
            const exists = wishlist.items.find(
                item => item.product.toString() == productId
            )

            if (exists) {
                return res.status(400).json({ message: 'Product already in wishlist' })
            }
            
            
            wishlist.items.push({ product: productId })
            await wishlist.save()
        }

        await wishlist.populate('items.product')
        res.json(wishlist)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/remove/:itemId', protect, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id })
        if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' })
        }

        wishlist.items = wishlist.items.filter(
        item => item._id.toString() !== req.params.itemId
        )

        await wishlist.save()
        await wishlist.populate('items.product')
        res.json(wishlist)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/clear', protect, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id })
        if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' })
        }

        wishlist.items = []
        await wishlist.save()
        res.json({ message: 'Wishlist cleared' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router