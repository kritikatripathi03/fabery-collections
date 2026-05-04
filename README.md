# FÄBERY COLLECTIONS 🛍️

A full stack MERN e-commerce application for a premium fashion brand. Built with React, Tailwind CSS, Node.js, Express and MongoDB.

![FÄBERY Collections](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80)

## 🌐 Live Demo

👉 [fabery-collections.vercel.app](https://fabery-collections.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** — Register and login with JWT based auth, persistent sessions
- 🛍️ **Product Catalog** — Browse products with search, filters by size/category/price, and sorting
- 📦 **Product Detail** — View product images, sizes, stock availability
- 🛒 **Cart** — Add, update quantity, remove items, view order total
- ❤️ **Wishlist** — Save products for later
- 📋 **Orders** — Place orders with shipping address, view order history with status
- 💳 **Checkout** — Full checkout flow with shipping form and payment method selection
- 👤 **Profile** — View account details and complete order history
- 📱 **Responsive** — Works on mobile, tablet and desktop

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React | UI library |
| Tailwind CSS | Styling |
| React Router DOM | Client side routing |
| Axios | API calls |
| Context API | Global auth state |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Server framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
fabery-collections/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Axios instance with interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductProfile.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── config/
    │   └── db.js                 # MongoDB connection
    ├── middleware/
    │   └── authMiddleware.js     # JWT protect middleware
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   ├── Cart.js
    │   ├── Wishlist.js
    │   └── Order.js
    ├── routes/
    │   ├── auth.js
    │   ├── products.js
    │   ├── cart.js
    │   ├── wishlist.js
    │   └── orders.js
    ├── seeder.js
    └── server.js
```

---

## 🔌 API Routes

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/profile` | Private | Get logged in user |

### Products
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get single product |
| GET | `/api/products/category/:category` | Public | Get products by category |

### Cart
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/cart` | Private | Get user's cart |
| POST | `/api/cart/add` | Private | Add item to cart |
| PUT | `/api/cart/update/:itemId` | Private | Update item quantity |
| DELETE | `/api/cart/remove/:itemId` | Private | Remove item from cart |
| DELETE | `/api/cart/clear` | Private | Clear entire cart |

### Wishlist
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/wishlist` | Private | Get user's wishlist |
| POST | `/api/wishlist/add` | Private | Add item to wishlist |
| DELETE | `/api/wishlist/remove/:itemId` | Private | Remove item |
| DELETE | `/api/wishlist/clear` | Private | Clear wishlist |

### Orders
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/orders` | Private | Place new order |
| GET | `/api/orders/myorders` | Private | Get user's orders |
| GET | `/api/orders/:id` | Private | Get single order |

---

## 🚀 Running Locally

### Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/fabery-collections.git
cd fabery-collections
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/fabery
JWT_SECRET=your_jwt_secret_here
```

Seed the database with sample products:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the app
Visit `http://localhost:5173` in your browser.

---

## 🔮 Upcoming Features

- [ ] Admin dashboard — manage products, orders and users
- [ ] Razorpay payment gateway integration
- [ ] Product reviews and ratings
- [ ] Email notifications (Nodemailer)
- [ ] Coupon and discount codes
- [ ] Pagination
- [ ] Cloudinary for image uploads

---

## 👨‍💻 Author

Built with ❤️ by [Kritika Tripathi](https://github.com/kritikatripathi03)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
