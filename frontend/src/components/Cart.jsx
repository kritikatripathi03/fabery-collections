import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get("/cart");
                setCart(data.items || []);
            } catch (err) {
                setError("Failed to load Cart");
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const handleQuantityUpdate = async (itemId, newQuantity) => {
        if(newQuantity < 1) return;
        try {
            const { data } = await axios.put(`/cart/update/${itemId}`, {
                quantity: newQuantity
            });
            setCart(data.items || []);
        } catch (err) {
            setError("Failed to upate qunatity!");
        } 
    };

    const handleRemove = async (itemId) => {
        try {
            const { data } = await axios.delete(`/cart/remove/${itemId}`);
            setCart(data.items || []);
        } catch (err) {
            setError("Failed to remove Product from Cart!");
        }
    };

    const handleClear = async () => {
        try {
            await axios.delete('/cart/clear');
            setCart([]);
        } catch (err) {
            setError("Failed to clear Cart!");
        }
    }
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading cart...
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-500">
      {error}
    </div>
  );

  if (cart.length === 0) return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <p className="text-2xl font-bold">Your cart is empty</p>
      <button
        onClick={() => navigate("/products")}
        className="bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-900 transition"
      >
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-10">YOUR CART</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-6">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-6 border-b border-gray-100 pb-6">
              {/* Product Image */}
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-28 h-28 object-cover border border-gray-200 cursor-pointer"
                onClick={() => navigate(`/product/${item.product._id}`)}
              />

              {/* Product Details */}
              <div className="flex-1 flex flex-col gap-2">
                <h3
                  className="font-bold text-lg cursor-pointer hover:underline"
                  onClick={() => navigate(`/product/${item.product._id}`)}
                >
                  {item.product.name}
                </h3>
                <p className="text-gray-500 text-sm capitalize">{item.product.category}</p>
                <p className="text-sm text-gray-500">Size: <span className="font-medium text-black">{item.size}</span></p>
                <p className="font-semibold">₹{item.product.price}</p>
              </div>

              {/* Quantity and Remove */}
              <div className="flex flex-col items-end justify-between">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button
                    onClick={() => handleQuantityUpdate(item._id, item.quantity - 1)}
                    className="px-3 py-1 text-lg hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityUpdate(item._id, item.quantity + 1)}
                    className="px-3 py-1 text-lg hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                {/* Item total */}
                <p className="text-sm font-semibold">₹{item.product.price * item.quantity}</p>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-sm text-red-400 hover:text-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Clear Cart */}
          <button
            onClick={handleClear}
            className="self-start text-sm text-gray-400 hover:text-red-500 underline transition"
          >
            Clear entire cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 h-fit border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full border border-black text-black py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}