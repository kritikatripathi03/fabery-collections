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
        <Link to="/" onClick={closeMenu}>
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
                  className="h-12 w-12 cursor-pointer rounded-full border border-transparent transition hover:border-stone-300"
                  src={profilePic}
                  alt="Profile"
                />
                {/* Dropdown */}
                <div className="absolute right-0 top-full z-50 hidden pt-2 group-hover:block">
                  <div className="surface-card-strong w-48 rounded-2xl p-2 shadow-2xl">
                    <p className="border-b border-stone-200 px-3 py-2 text-sm font-medium text-stone-700">
                      {user.name}
                    </p>
                    <Link
                      to="/profile"
                      className="block rounded-xl px-3 py-2 text-sm transition hover:bg-stone-100"
                    >
                      My Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-stone-950 transition hover:bg-stone-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                    >
                      Logout
                    </button>
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
