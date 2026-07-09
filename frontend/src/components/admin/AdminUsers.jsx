import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/admin/users");
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading users...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold">Users</h1>
        <p className="text-gray-500 mt-1">{users.length} users total</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-4 px-4 text-gray-400 font-medium">User</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Email</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Role</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Joined</th>
              <th className="text-left py-4 px-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-500">{user.email}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.isAdmin
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.isAdmin ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </td>
                  <td className="py-4 px-4">
                    {user._id === currentUser._id ? (
                      <span className="text-xs text-gray-400">You</span>
                    ) : user.isAdmin ? (
                      <span className="text-xs text-gray-400">Protected</span>
                    ) : (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-sm text-red-400 underline hover:text-red-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}