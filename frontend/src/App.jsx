
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

