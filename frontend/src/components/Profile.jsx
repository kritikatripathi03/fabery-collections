import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/orders/myorders");
        setOrders(data || []);
      } catch (err) {
        setError("Failed to load orders!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading profile...
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-500">
      {error}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* User Info */}
      <div className="border border-gray-200 rounded-2xl p-6 mb-10 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Order History */}
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-900 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">

              {/* Order Header */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-medium">{order._id}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <p className="font-bold text-lg">₹{order.totalAmount}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-t border-gray-100 pt-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.product?.name || "Product"}</p>
                      <p className="text-xs text-gray-400">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Payment method */}
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}