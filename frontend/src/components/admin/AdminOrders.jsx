import { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function AdminOrders () {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("/admin/orders");
                setOrders(data);
            } catch (error) {
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderID, status) => {
        setUpdatingId(orderID);
        try {
            const { data } = await axios.put(`/admin/orders/${orderID}`, { status });
            setOrders(prevOrders => prevOrders.map(order => (
                order._id === orderID
                    ? {
                        ...order,
                        status: data.status,
                    }
                    : order
            )));
        } catch (err) {
            setError("Failed to update order status");
        } finally {
            setUpdatingId(null);
        }
    };

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-700",
        confirmed: "bg-blue-100 text-blue-700",
        shipped: "bg-purple-100 text-purple-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700"
    };

    const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading orders...
        </div>
    );


    return (
    <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
            <h1 className="text-4xl font-extrabold">Orders</h1>
            <p className="text-gray-500 mt-1">{orders.length} orders total</p>
        </div>

        {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
            </div>
        )}

        {orders.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-gray-400">
            No orders yet
            </div>
        ) : (
            <div className="flex flex-col gap-6">
            {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-2xl p-6">

                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="text-sm font-mono font-medium">
                        {order._id.slice(-12).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                        })}
                    </p>
                    </div>

                    <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400">Customer</p>
                    <p className="text-sm font-medium">{order.user?.name || "Deleted User"}</p>
                    <p className="text-xs text-gray-400">{order.user?.email}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="text-lg font-bold">₹{order.totalAmount}</p>
                    <p className="text-xs text-gray-400 capitalize">
                        {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
                    </p>
                    </div>

                    <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Status</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize w-fit ${statusColors[order.status]}`}>
                        {order.status}
                    </span>
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        disabled={updatingId === order._id}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-black transition disabled:opacity-50"
                    >
                        {statuses.map(s => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                        ))}
                    </select>
                    </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400 mb-3">Items</p>
                    <div className="flex flex-col gap-2">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                            {item.product?.name || "Deleted Product"}
                            </p>
                            <p className="text-xs text-gray-400">
                            Size: {item.size} · Qty: {item.quantity}
                            </p>
                        </div>
                        <p className="text-sm font-semibold">
                            ₹{item.price * item.quantity}
                        </p>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                    <p className="text-xs text-gray-400 mb-2">Shipping Address</p>
                    <p className="text-sm text-gray-600">
                    {order.shippingAddress.fullName}, {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.pincode} · {order.shippingAddress.phone}
                    </p>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
}