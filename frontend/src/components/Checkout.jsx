import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/cart");
        setCart(data.items || []);
      } catch (err) {
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError("Failed to load Razorpay. Check your connection and try again.");
      return;
    }

    // Create an order on the backend
    const { data: order } = await axios.post("/payment/create-order", {
      amount: total,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Shopping App",
      description: "Order Payment",
      order_id: order.id,
      prefill: {
        name: form.fullName,
        contact: form.phone,
      },
      theme: { color: "#000000" },
      handler: async (response) => {
        try {
          await axios.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            shippingAddress: form,
          });
          navigate("/profile");
        } catch (err) {
          setError(err.response?.data?.message || "Payment verification failed");
          setOrderLoading(false);
        }
      },
      modal: {
        ondismiss: () => setOrderLoading(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      setError(response.error?.description || "Payment failed");
      setOrderLoading(false);
    });
    rzp.open();
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderLoading(true);
    setError("");
    try {
      if (paymentMethod === "online") {
        await handleOnlinePayment();
        // orderLoading is cleared by the Razorpay handler / dismiss callbacks
        return;
      }

      await axios.post("/orders", {
        shippingAddress: form,
        paymentMethod,
      });
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
      setOrderLoading(false);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity, 0
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading checkout...
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
      <h1 className="text-4xl font-extrabold mb-10">CHECKOUT</h1>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Left — Shipping Form */}
        <div className="flex-1">
          <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">

            {/* Shipping Address */}
            <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Shipping Address</h2>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Main Street"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="Delhi"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    placeholder="Delhi"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    required
                    placeholder="110001"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="9999999999"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold">Payment Method</h2>
              <div className="flex flex-col gap-3">
                <label className={`flex items-center gap-4 border rounded-xl px-4 py-3 cursor-pointer transition ${paymentMethod === "cod" ? "border-black" : "border-gray-200"}`}>
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-black"
                  />
                  <div>
                    <p className="text-sm font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-400">Pay when your order arrives</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 border rounded-xl px-4 py-3 cursor-pointer transition ${paymentMethod === "online" ? "border-black" : "border-gray-200"}`}>
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="accent-black"
                  />
                  <div>
                    <p className="text-sm font-medium">Online Payment</p>
                    <p className="text-xs text-gray-400">Pay securely via Razorpay</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={orderLoading}
              className="w-full bg-black text-white py-4 rounded-full text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50"
            >
              {orderLoading
                ? "Processing..."
                : paymentMethod === "online"
                ? `Pay ₹${total}`
                : "Place Order"}
            </button>
          </form>
        </div>

        {/* Right — Order Summary */}
        <div className="w-full lg:w-80 h-fit border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-400">Size: {item.size} · Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">₹{item.product.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
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
        </div>
      </div>
    </div>
  );
}