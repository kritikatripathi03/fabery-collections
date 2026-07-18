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
      } catch {
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
    <div className="flex min-h-[60vh] items-center justify-center text-stone-500">
      Loading profile...
    </div>
  );

  if (error) return (
    <div className="flex min-h-[60vh] items-center justify-center text-red-600">
      {error}
    </div>
  );

  return (
    <div className="py-6 lg:py-10">
      <div className="surface-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-950 text-2xl font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="section-kicker">Account</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-stone-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="btn-secondary px-5 py-3 text-sm"
          >
            Continue Shopping
          </button>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-stone-200 pt-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Order History</h2>
            <p className="mt-1 text-sm text-stone-500">Recent orders and their current status.</p>
          </div>
        </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-stone-500">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="btn-primary px-6 py-3 text-sm"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order._id} className="surface-card-strong rounded-[2rem] p-6 flex flex-col gap-5">

              {/* Order Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="section-kicker">Order ID</p>
                  <p className="mt-2 text-sm font-medium text-stone-950">{order._id}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <p className="text-lg font-semibold text-stone-950">₹{order.totalAmount}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-3 border-t border-stone-200 pt-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 rounded-2xl bg-stone-50/80 px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-950">{item.product?.name || "Product"}</p>
                      <p className="text-xs text-stone-500">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-stone-950">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Payment method */}
              <p className="section-kicker">
                Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
              </p>

            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}