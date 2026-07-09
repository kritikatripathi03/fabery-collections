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
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading dashboard...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-10">Welcome back! Here's what's happening.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-gray-400 mb-1">Total Products</p>
          <p className="text-3xl font-extrabold">{stats.totalProducts}</p>
          <Link to="/admin/products" className="text-sm text-black underline mt-2 block">
            Manage →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-gray-400 mb-1">Total Orders</p>
          <p className="text-3xl font-extrabold">{stats.totalOrders}</p>
          <Link to="/admin/orders" className="text-sm text-black underline mt-2 block">
            Manage →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-gray-400 mb-1">Total Users</p>
          <p className="text-3xl font-extrabold">{stats.totalUsers}</p>
          <Link to="/admin/users" className="text-sm text-black underline mt-2 block">
            Manage →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
          <p className="text-3xl font-extrabold">₹{stats.totalRevenue}</p>
          <p className="text-sm text-gray-400 mt-2">All time</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="border border-gray-200 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-black underline">
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Order ID</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Customer</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Total</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">
                      {order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 px-2">
                      {order.user?.name || "Deleted User"}
                    </td>
                    <td className="py-3 px-2 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 px-2 font-semibold">
                      ₹{order.totalAmount}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Link
          to="/admin/products"
          className="border border-black text-black px-6 py-4 rounded-2xl font-medium hover:bg-black hover:text-white transition text-center"
        >
          + Add New Product
        </Link>
        <Link
          to="/admin/orders"
          className="border border-black text-black px-6 py-4 rounded-2xl font-medium hover:bg-black hover:text-white transition text-center"
        >
          View All Orders
        </Link>
        <Link
          to="/admin/users"
          className="border border-black text-black px-6 py-4 rounded-2xl font-medium hover:bg-black hover:text-white transition text-center"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
}