import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/login", { email, password });
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center py-10">
      <div className="surface-card w-full max-w-md rounded-[2rem] px-6 py-8 sm:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="section-kicker mb-4">Welcome back</p>
          <h1 className="text-4xl font-semibold tracking-tight mb-2 text-stone-950">
            Welcome back
          </h1>
          <p className="text-sm text-stone-500">
            Sign in to your FABERY account
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-modern"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-modern"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full py-3 text-sm disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-stone-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-stone-950 underline underline-offset-4">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
