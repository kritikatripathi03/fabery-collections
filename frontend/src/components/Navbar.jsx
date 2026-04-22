import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoSmall from "../assets/logo-small.png";
import logo from "../assets/logo-new.png";
import wishlistIcon from "../assets/wishlist-icon.png";
import cartIcon from "../assets/cart.png";
import profilePic from "../assets/profile.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  const closeMenu = () => setOpen(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Collections", to: "/products" },
    { label: "New", to: "/new" },
  ];

  return (
    <nav className="w-full bg-transparent mt-4 px-4 py-4">
      <div className="flex items-center justify-between px-4">
        
        {/* Desktop nav links */}
        <div className="hidden lg:flex gap-6 text-xl">
          {navLinks.map((link) => (
            <span key={link.to} className="px-2 font-bold hover:font-extrabold">
              <Link to={link.to}>{link.label}</Link>
            </span>
          ))}
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>

        {/* Logo — goes home */}
        <Link to="/" onClick={closeMenu}>
          <div className="flex gap-6">
            <img className="h-16 w-16" src={logoSmall} alt="FABERY" />
            <img
              className="hidden sm:block py-2 h-20 w-26"
              src={logo}
              alt="FABERY"
            />
          </div>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist">
            <img
              className="hidden md:flex h-12 w-12"
              src={wishlistIcon}
              alt="Wishlist"
            />
          </Link>

          <Link to="/cart">
            <div className="relative flex items-center ml-10 mr-10">
              <button className="hidden md:flex bg-black text-white px-6 py-3 rounded-full pr-8">
                Cart
              </button>
              <div className="absolute right-0 translate-x-1/2 bg-white border-4 border-black rounded-full h-10 w-10 flex items-center justify-center">
                <img className="h-5 w-5" src={cartIcon} alt="Cart" />
              </div>
            </div>
          </Link>

          <Link to="/profile">
            <img className="h-12 w-12" src={profilePic} alt="Profile" />
          </Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden mt-2 w-48 bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="font-bold hover:font-extrabold"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={closeMenu} className="font-bold hover:font-extrabold">Cart</Link>
            <Link to="/wishlist" onClick={closeMenu} className="font-bold hover:font-extrabold">Wishlist</Link>
          </div>
        </div>
      )}
    </nav>
  );
}