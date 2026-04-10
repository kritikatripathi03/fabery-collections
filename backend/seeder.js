const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product')

dotenv.config()

const products = [
    {
    name: 'Classic White T-Shirt',
    description: 'A clean and comfortable everyday white t-shirt made from 100% cotton.',
    price: 499,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://via.placeholder.com/500x500?text=White+T-Shirt'],
    stock: 50
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a comfortable stretch fabric.',
    price: 1299,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://via.placeholder.com/500x500?text=Slim+Fit+Jeans'],
    stock: 30
  },
  {
    name: 'Floral Summer Dress',
    description: 'A light and breezy floral dress perfect for summer outings.',
    price: 999,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://via.placeholder.com/500x500?text=Floral+Dress'],
    stock: 25
  },
  {
    name: 'Women Casual Hoodie',
    description: 'Soft and cozy hoodie for everyday casual wear.',
    price: 1099,
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://via.placeholder.com/500x500?text=Women+Hoodie'],
    stock: 40
  },
  {
    name: 'Kids Cartoon T-Shirt',
    description: 'Fun and colorful cartoon printed t-shirt for kids.',
    price: 349,
    category: 'kids',
    sizes: ['XS', 'S', 'M'],
    images: ['https://via.placeholder.com/500x500?text=Kids+T-Shirt'],
    stock: 60
  },
  {
    name: 'Kids Denim Shorts',
    description: 'Durable and comfortable denim shorts for active kids.',
    price: 599,
    category: 'kids',
    sizes: ['XS', 'S', 'M'],
    images: ['https://via.placeholder.com/500x500?text=Kids+Shorts'],
    stock: 35
  },
  {
    name: 'Leather Belt',
    description: 'Premium quality leather belt with a classic buckle.',
    price: 449,
    category: 'accessories',
    sizes: [],
    images: ['https://via.placeholder.com/500x500?text=Leather+Belt'],
    stock: 80
  },
  {
    name: 'Canvas Tote Bag',
    description: 'Spacious and eco-friendly canvas tote bag for daily use.',
    price: 299,
    category: 'accessories',
    sizes: [],
    images: ['https://via.placeholder.com/500x500?text=Tote+Bag'],
    stock: 100
  }
]

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        // Clear existing products
        await Product.deleteMany()
        console.log('Existing products cleared')

        // Insert new products
        await Product.insertMany(products)
        console.log('Product seeded successfully')

        process.exit()
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

seedData()