import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="flex items-center justify-between px-8 py-4">
        <div className="hidden lg:flex gap-6">
          <span className="px-2 font-bold">Home</span>
          <span className="px-2 font-bold">Collections</span>
          <span className="px-2 font-bold">New</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <div className="flex gap-6">
          <img
            className="h-16 w-16"
            src="src\assets\logo-small.png"
            alt="FABERY"
          />
          
          <img
            className="hidden sm:block py-2 h-20 w-26"
            src="src\assets\logo-new.png"
            alt="FABERY"
          />
        </div>

        <div className="flex items-center gap-4">
          <img
            className="hidden md:flex h-12 w-12"
            src="src\assets\wishlist-icon.png"
            alt="WISHLIST"
          />
          <div className="relative flex items-center ml-10 mr-10">
            <button className="hidden md:flex bg-black text-white px-6 py-3 rounded-full pr-8">
                Cart
            </button>
            <div className="absolute right-0 translate-x-1/2 bg-white border-4 border-black rounded-full h-10 w-10 flex items-center justify-center">
                <img className="h-5 w-5" src="src\assets\cart.png" alt="WISHLIST" />
            </div>
          </div>
          
          <img
            className="h-12 w-12"
            src="src\assets\profile.png"
            alt="WISHLIST"
          />
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
