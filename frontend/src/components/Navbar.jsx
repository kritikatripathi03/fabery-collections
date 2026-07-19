import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoSmall from "../assets/logo-small.png";
import logo from "../assets/logo-new.png";
import wishlistIcon from "../assets/wishlist-icon.png";
import cartIcon from "../assets/cart.png";
import profilePic from "../assets/profile.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Collections", to: "/products" },
    { label: "New", to: "/new" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-3 py-3 sm:px-4 sm:py-4">
      <div className="surface-card mx-auto flex items-center justify-between rounded-[1.75rem] px-4 py-3 sm:px-5 lg:px-6">
        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-[0.22em] text-stone-600">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="transition hover:text-stone-950">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="btn-secondary lg:hidden px-4 py-2 text-sm" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation menu">
          {open ? "Close" : "Menu"}
        </button>

        {/* Logo */}
        <Link to="/about" onClick={closeMenu}>
          <div className="flex items-center gap-4">
            <img className="h-16 w-16" src={logoSmall} alt="FABERY" />
            <img
              className="hidden sm:block h-14 w-auto py-2"
              src={logo}
              alt="FABERY"
            />
          </div>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              <Link to="/wishlist">
                <img
                  className="hidden md:flex h-11 w-11 rounded-full border border-transparent transition hover:border-stone-300"
                  src={wishlistIcon}
                  alt="Wishlist"
                />
              </Link>

              <Link to="/cart">
                <div className="relative flex items-center ml-4 mr-4">
                  <button className="btn-primary hidden md:flex px-5 py-3 pr-8">
                    Cart
                  </button>
                  <div className="surface-card-strong absolute right-0 flex h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border-2 border-stone-950">
                    <img className="h-5 w-5" src={cartIcon} alt="Cart" />
                  </div>
                </div>
              </Link>

              <div className="group relative">
                <img
                  className="h-12 w-12 cursor-pointer rounded-full border-2 border-stone-200 transition hover:border-stone-950"
                  src={profilePic}
                  alt="Profile"
                />
                {/* Dropdown */}
                <div className="absolute right-0 top-full z-50 hidden pt-2 group-hover:block">
                  <div className="surface-card-strong w-56 rounded-2xl p-2.5 shadow-2xl border border-stone-200/80">
                    {/* User Header */}
                    <div className="border-b border-stone-200/80 px-3 py-2 mb-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-stone-950 truncate">
                          {user.name}
                        </p>
                        {user.isAdmin && (
                          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-amber-800">
                            Admin
                          </span>
                        )}
                      </div>
                      {user.email && (
                        <p className="text-xs text-stone-500 truncate mt-0.5">
                          {user.email}
                        </p>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-0.5">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
                      >
                        <svg className="h-4 w-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>

                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="my-1 flex items-center justify-between rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-stone-950 hover:to-stone-900 hover:shadow-lg"
                        >
                          <div className="flex items-center gap-2.5">
                            <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Admin Dashboard</span>
                          </div>
                          <span className="text-xs">➔</span>
                        </Link>
                      )}

                      <div className="my-1 border-t border-stone-200/80" />

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="btn-primary px-5 py-3 text-sm"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="surface-card-strong mx-auto mt-3 rounded-[1.5rem] p-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 font-medium transition hover:bg-stone-100"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/cart" onClick={closeMenu} className="rounded-xl px-3 py-2 font-medium transition hover:bg-stone-100">Cart</Link>
                <Link to="/wishlist" onClick={closeMenu} className="rounded-xl px-3 py-2 font-medium transition hover:bg-stone-100">Wishlist</Link>
                <Link to="/profile" onClick={closeMenu} className="rounded-xl px-3 py-2 font-medium transition hover:bg-stone-100">Profile</Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="my-1 flex items-center justify-between rounded-xl bg-stone-900 px-3.5 py-2.5 font-semibold text-white transition hover:bg-stone-950"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">🛡️</span>
                      <span>Admin Dashboard</span>
                    </div>
                    <span className="text-xs">➔</span>
                  </Link>
                )}
                <button onClick={handleLogout} className="rounded-xl px-3 py-2 text-left font-medium text-red-600 transition hover:bg-red-50">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} className="rounded-xl px-3 py-2 font-medium transition hover:bg-stone-100">Sign in</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
