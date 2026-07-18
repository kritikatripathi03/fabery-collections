import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
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
          <p className="section-kicker mb-4">Join us</p>
          <h1 className="text-4xl font-semibold tracking-tight mb-2 text-stone-950">
            Create account
          </h1>
          <p className="text-sm text-stone-500">
            Join FABERY and start shopping
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
            <label className="text-sm font-medium text-stone-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-modern"
            />
          </div>

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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-stone-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-modern"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full py-3 text-sm disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-stone-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-stone-950 underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
