import { useState } from "react";
import { Link } from "react-router-dom";
import logoSmall from "../assets/logo-small.png";
import logo from "../assets/logo-new.png";
import wishlist from "../assets/wishlist-icon.png";
import cart from "../assets/cart.png";
import profilePic from "../assets/profile.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-transparent mt-4 px-4 py-4">
      <div className="flex items-center justify-between px-4">
        <div className="hidden lg:flex gap-6 text-xl">
          <span className="px-2 font-bold hover:font-extrabold">
            <Link to="/">Home</Link>
          </span>
          <span className="px-2 font-bold hover:font-extrabold">
            <Link to="/products">Collections</Link>
          </span>
          <span className="px-2 font-bold hover:font-extrabold">
            <Link to="/new">New</Link>
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <Link to="/about">
          <div className="flex gap-6">
            <img className="h-16 w-16" src={logoSmall} alt="FABERY" />

            <img
              className="hidden sm:block py-2 h-20 w-26"
              src={logo}
              alt="FABERY"
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/wishlist">
            <img
              className="hidden md:flex h-12 w-12"
              src={wishlist}
              alt="WISHLIST"
            />
          </Link>
          <Link to="/cart">
            <div className="relative flex items-center ml-10 mr-10">
              <button className="hidden md:flex bg-black text-white px-6 py-3 rounded-full pr-8">
                Cart
              </button>
              <div className="absolute right-0 translate-x-1/2 bg-white border-4 border-black rounded-full h-10 w-10 flex items-center justify-center">
                <img className="h-5 w-5" src={cart} alt="WISHLIST" />
              </div>
            </div>
          </Link>

          <Link to="/profile">
            <img className="h-12 w-12" src={profilePic} alt="Profile" />
          </Link>
        </div>
      </div>

      {/* SIDEBAR / DROPDOWN (outside flex row) */}
      {open && (
        <div className="lg:hidden mt-2 w-48 bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col gap-3">
            <a>Home</a>
            <a>Products</a>
            <a>Cart</a>
          </div>
        </div>
      )}
    </nav>
  );
}
