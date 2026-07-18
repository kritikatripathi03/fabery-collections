import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get("/cart");
                setCart(data.items || []);
        } catch {
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
      } catch {
            setError("Failed to upate qunatity!");
        } 
    };

    const handleRemove = async (itemId) => {
        try {
            const { data } = await axios.delete(`/cart/remove/${itemId}`);
            setCart(data.items || []);
      } catch {
            setError("Failed to remove Product from Cart!");
        }
    };

    const handleClear = async () => {
        try {
            await axios.delete('/cart/clear');
            setCart([]);
      } catch {
            setError("Failed to clear Cart!");
        }
    }
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center text-stone-500">
      Loading cart...
    </div>
  );

  if (error) return (
    <div className="flex min-h-[60vh] items-center justify-center text-red-600">
      {error}
    </div>
  );

  if (cart.length === 0) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-12 text-center">
      <p className="text-2xl font-semibold text-stone-950">Your cart is empty</p>
      <button
        onClick={() => navigate("/products")}
        className="btn-primary px-6 py-3 text-sm"
      >
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="py-6 lg:py-10">
      <h1 className="section-title mb-8">Your cart</h1>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Cart Items */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item._id} className="surface-card flex gap-4 rounded-[1.75rem] p-4 sm:p-5">
              {/* Product Image */}
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="h-28 w-28 cursor-pointer rounded-2xl object-cover"
                onClick={() => navigate(`/product/${item.product._id}`)}
              />

              {/* Product Details */}
              <div className="flex flex-1 flex-col gap-2">
                <h3
                  className="cursor-pointer text-lg font-semibold text-stone-950 hover:underline"
                  onClick={() => navigate(`/product/${item.product._id}`)}
                >
                  {item.product.name}
                </h3>
                <p className="text-sm capitalize text-stone-500">{item.product.category}</p>
                <p className="text-sm text-stone-500">Size: <span className="font-medium text-stone-950">{item.size}</span></p>
                <p className="text-lg font-semibold text-stone-950">₹{item.product.price}</p>
              </div>

              {/* Quantity and Remove */}
              <div className="flex flex-col items-end justify-between gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center rounded-full border border-stone-200 bg-white px-1 py-1">
                  <button
                    onClick={() => handleQuantityUpdate(item._id, item.quantity - 1)}
                    className="rounded-full px-3 py-1 text-lg transition hover:bg-stone-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 text-sm font-medium text-stone-950">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityUpdate(item._id, item.quantity + 1)}
                    className="rounded-full px-3 py-1 text-lg transition hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>

                {/* Item total */}
                <p className="text-sm font-semibold text-stone-950">₹{item.product.price * item.quantity}</p>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-sm font-medium text-red-600 transition hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Clear Cart */}
          <button
            onClick={handleClear}
            className="self-start text-sm font-medium text-stone-500 underline underline-offset-4 transition hover:text-red-600"
          >
            Clear entire cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="surface-card h-fit rounded-[2rem] p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-stone-950">Order Summary</h2>

          <div className="flex flex-col gap-2 text-sm text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="soft-divider border-t pt-4 flex justify-between text-lg font-semibold text-stone-950">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="btn-primary w-full py-3 text-sm"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/products")}
            className="btn-secondary w-full py-3 text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}