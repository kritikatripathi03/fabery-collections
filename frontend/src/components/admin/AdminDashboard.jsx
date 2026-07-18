import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get("/admin/products"),
          axios.get("/admin/orders"),
          axios.get("/admin/users")
        ]);

        const totalRevenue = ordersRes.data.reduce(
          (acc, order) => acc + order.totalAmount, 0
        );

        setStats({
          totalProducts: productsRes.data.length,
          totalOrders: ordersRes.data.length,
          totalUsers: usersRes.data.length,
          totalRevenue
        });

        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700"
  };

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center text-stone-500">
      Loading dashboard...
    </div>
  );

  return (
    <div className="py-6 lg:py-10">
      <div className="surface-card rounded-[2rem] px-6 py-6 sm:px-8 lg:px-10">
        <p className="section-kicker">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          Admin Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-500 sm:text-base">
          Welcome back. Here’s a quick look at the store’s current activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="surface-card rounded-[2rem] p-6">
          <p className="section-kicker">Total Products</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">{stats.totalProducts}</p>
          <Link to="/admin/products" className="mt-3 inline-block text-sm font-medium text-stone-950 underline underline-offset-4">
            Manage →
          </Link>
        </div>
        <div className="surface-card rounded-[2rem] p-6">
          <p className="section-kicker">Total Orders</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">{stats.totalOrders}</p>
          <Link to="/admin/orders" className="mt-3 inline-block text-sm font-medium text-stone-950 underline underline-offset-4">
            Manage →
          </Link>
        </div>
        <div className="surface-card rounded-[2rem] p-6">
          <p className="section-kicker">Total Users</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">{stats.totalUsers}</p>
          <Link to="/admin/users" className="mt-3 inline-block text-sm font-medium text-stone-950 underline underline-offset-4">
            Manage →
          </Link>
        </div>
        <div className="surface-card rounded-[2rem] p-6">
          <p className="section-kicker">Total Revenue</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-stone-950">₹{stats.totalRevenue}</p>
          <p className="mt-3 text-sm text-stone-500">All time</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="surface-card rounded-[2rem] p-6 mt-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Recent Orders</h2>
            <p className="mt-1 text-sm text-stone-500">Latest activity across the store.</p>
          </div>
          <Link to="/admin/orders" className="text-sm font-medium text-stone-950 underline underline-offset-4">
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500">
                <th className="py-3 px-2 text-left font-medium">Order ID</th>
                <th className="py-3 px-2 text-left font-medium">Customer</th>
                <th className="py-3 px-2 text-left font-medium">Date</th>
                <th className="py-3 px-2 text-left font-medium">Total</th>
                <th className="py-3 px-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-stone-400">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-stone-100 transition hover:bg-stone-50/80">
                    <td className="py-3 px-2 font-mono text-xs text-stone-700">
                      {order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 px-2 text-stone-900">
                      {order.user?.name || "Deleted User"}
                    </td>
                    <td className="py-3 px-2 text-stone-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 px-2 font-semibold text-stone-950">
                      ₹{order.totalAmount}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link
          to="/admin/products"
          className="btn-primary px-6 py-4 text-center"
        >
          + Add New Product
        </Link>
        <Link
          to="/admin/orders"
          className="btn-secondary px-6 py-4 text-center"
        >
          View All Orders
        </Link>
        <Link
          to="/admin/users"
          className="btn-secondary px-6 py-4 text-center"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
}