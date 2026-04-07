const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const protect = require('../middleware/authMiddleware')

// Register
router.post('/register', async(req, res) => {
    const { name, email, password } = req.body

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email })
        if(userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get Profile
router.get('/profile', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router