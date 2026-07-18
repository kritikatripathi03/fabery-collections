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
            } catch {
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
        } catch {
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
        <div className="flex min-h-[60vh] items-center justify-center text-stone-500">
          Loading orders...
        </div>
    );


    return (
    <div className="py-6 lg:py-10">
        <div className="surface-card rounded-[2rem] px-6 py-6 sm:px-8 lg:px-10">
            <p className="section-kicker">Admin Orders</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">Orders</h1>
            <p className="mt-2 text-sm text-stone-500">{orders.length} orders total</p>
        </div>

        {error && (
            <div className="mb-6 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
            </div>
        )}

        {orders.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-stone-400">
            No orders yet
            </div>
        ) : (
            <div className="mt-6 flex flex-col gap-6">
            {orders.map((order) => (
                <div key={order._id} className="surface-card rounded-[2rem] p-6">

                {/* Order Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div className="flex flex-col gap-1">
                    <p className="section-kicker">Order ID</p>
                    <p className="mt-2 text-sm font-mono font-medium text-stone-950">
                        {order._id.slice(-12).toUpperCase()}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                        })}
                    </p>
                    </div>

                    <div className="flex flex-col gap-1">
                    <p className="section-kicker">Customer</p>
                    <p className="text-sm font-medium text-stone-950">{order.user?.name || "Deleted User"}</p>
                    <p className="text-xs text-stone-500">{order.user?.email}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                    <p className="section-kicker">Total</p>
                    <p className="text-lg font-semibold text-stone-950">₹{order.totalAmount}</p>
                    <p className="text-xs capitalize text-stone-500">
                        {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
                    </p>
                    </div>

                    <div className="flex flex-col gap-2">
                    <p className="section-kicker">Status</p>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[order.status]}`}>
                        {order.status}
                    </span>
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        disabled={updatingId === order._id}
                        className="select-modern max-w-[160px] px-3 py-2 text-xs disabled:opacity-50"
                    >
                        {statuses.map(s => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                        ))}
                    </select>
                    </div>
                </div>

                {/* Order Items */}
                <div className="soft-divider border-t pt-4">
                    <p className="section-kicker mb-3">Items</p>
                    <div className="flex flex-col gap-2">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-2xl bg-stone-50/80 px-4 py-3">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-stone-950">
                            {item.product?.name || "Deleted Product"}
                            </p>
                            <p className="text-xs text-stone-500">
                            Size: {item.size} · Qty: {item.quantity}
                            </p>
                        </div>
                        <p className="text-sm font-semibold text-stone-950">
                            ₹{item.price * item.quantity}
                        </p>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="soft-divider border-t pt-4 mt-4">
                    <p className="section-kicker mb-2">Shipping Address</p>
                    <p className="text-sm leading-7 text-stone-600">
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