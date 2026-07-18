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
      } catch {
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
    } catch {
      setError("Failed to delete user");
    }
  };

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center text-stone-500">
      Loading users...
    </div>
  );

  return (
    <div className="py-6 lg:py-10">
      <div className="surface-card rounded-[2rem] px-6 py-6 sm:px-8 lg:px-10">
        <p className="section-kicker">Admin Users</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">Users</h1>
        <p className="mt-2 text-sm text-stone-500">{users.length} users total</p>
      </div>

      {error && (
        <div className="mb-6 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="surface-card mt-6 overflow-hidden rounded-[2rem]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-white/60 text-stone-500">
              <th className="py-4 px-4 text-left font-medium">User</th>
              <th className="py-4 px-4 text-left font-medium">Email</th>
              <th className="py-4 px-4 text-left font-medium">Role</th>
              <th className="py-4 px-4 text-left font-medium">Joined</th>
              <th className="py-4 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-stone-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b border-stone-100 transition hover:bg-stone-50/80">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-950 text-sm font-semibold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-medium text-stone-950">{user.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-stone-500">{user.email}</td>
                  <td className="py-4 px-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      user.isAdmin
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {user.isAdmin ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-stone-500">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </td>
                  <td className="py-4 px-4">
                    {user._id === currentUser._id ? (
                      <span className="text-xs text-stone-400">You</span>
                    ) : user.isAdmin ? (
                      <span className="text-xs text-stone-400">Protected</span>
                    ) : (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-sm font-medium text-red-600 underline underline-offset-4 transition hover:text-red-700"
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