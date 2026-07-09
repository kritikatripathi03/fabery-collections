import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductProfile from "./components/ProductProfile";
import New from "./components/New";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./components/admin/AdminDashboard"
import AdminProducts from "./components/admin/AdminProducts"
import AdminOrders from "./components/admin/AdminOrders"
import AdminUsers from "./components/admin/AdminUsers"

export default function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductProfile />} />
        <Route path="/new" element={<New />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
          <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/*Admin Routes*/}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              
      </Routes>
      
      <Footer></Footer>
    </Router>
  );
}
