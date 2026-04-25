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
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    stock: 50
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a comfortable stretch fabric.',
    price: 1299,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'],
    stock: 30
  },
  {
    name: 'Floral Summer Dress',
    description: 'A light and breezy floral dress perfect for summer outings.',
    price: 999,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500'],
    stock: 25
  },
  {
    name: 'Women Casual Hoodie',
    description: 'Soft and cozy hoodie for everyday casual wear.',
    price: 1099,
    category: 'women',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=500'],
    stock: 40
  },
  {
    name: 'Kids Cartoon T-Shirt',
    description: 'Fun and colorful cartoon printed t-shirt for kids.',
    price: 349,
    category: 'kids',
    sizes: ['XS', 'S', 'M'],
    images: ['https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=500'],
    stock: 60
  },
  {
    name: 'Kids Denim Shorts',
    description: 'Durable and comfortable denim shorts for active kids.',
    price: 599,
    category: 'kids',
    sizes: ['XS', 'S', 'M'],
    images: ['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500'],
    stock: 35
  },
  {
    name: 'Leather Belt',
    description: 'Premium quality leather belt with a classic buckle.',
    price: 449,
    category: 'accessories',
    sizes: [],
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    stock: 80
  },
  {
    name: 'Canvas Tote Bag',
    description: 'Spacious and eco-friendly canvas tote bag for daily use.',
    price: 299,
    category: 'accessories',
    sizes: [],
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=500'],
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