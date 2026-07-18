import { useState } from "react";
import { Link } from "react-router-dom";
import logoSmall from "../assets/logo-small.png";
import logo from "../assets/logo-new.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="section-shell pb-8">
      <div className="surface-card rounded-[2rem] px-6 py-10 sm:px-8 lg:px-12">

        {/* Top section — Logo + Tagline + Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 pb-10 border-b border-stone-200">
          
          {/* Logo + Tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Link to="/about">
              <img src={logoSmall} alt="FABERY" className="h-10 w-10" />
              <img src={logo} alt="FABERY" className="h-10" />
              </Link>
            </div>
            <p className="text-sm text-stone-500 max-w-xs leading-6">
              Premium fashion, thoughtfully curated. Explore collections that define modern style.
            </p>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 max-w-sm w-full">
            <span className="section-kicker">Stay in the loop</span>
            <p className="text-sm text-stone-500">
              Subscribe to get early access to new collections and exclusive offers.
            </p>
            {subscribed ? (
              <p className="text-sm text-green-600 font-medium">
                Thank you for subscribing! 🎉
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-stone-400 transition"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-stone-800 transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle section — Links */}
        <div className="grid gap-10 md:grid-cols-4 py-10 border-b border-stone-200">
          <div>
            <span className="section-kicker">Info</span>
            <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">
              <Link to="/" className="transition hover:text-stone-950">Home</Link>
              <Link to="/about" className="transition hover:text-stone-950">About</Link>
              <Link to="/products" className="transition hover:text-stone-950">Collections</Link>
              <a href="#" className="transition hover:text-stone-950">Careers</a>
              <a href="#" className="transition hover:text-stone-950">Contact Us</a>
            </div>
          </div>

          <div>
            <span className="section-kicker">Support</span>
            <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">
              <a href="#" className="transition hover:text-stone-950">FAQ</a>
              <a href="#" className="transition hover:text-stone-950">Shipping Policy</a>
              <a href="#" className="transition hover:text-stone-950">Return Policy</a>
              <a href="#" className="transition hover:text-stone-950">Privacy Policy</a>
              <a href="#" className="transition hover:text-stone-950">Terms & Conditions</a>
            </div>
          </div>

          <div>
            <span className="section-kicker">Address</span>
            <p className="mt-5 max-w-sm text-sm leading-7 text-stone-600">
              DLF Cybercity
              <br />
              DLF Phase 2
              <br />
              Sector 24, Gurugram
              <br />
              Haryana, India, 122002
            </p>
            <p className="mt-3 text-sm text-stone-600">
              contact@faeberycollections.com
            </p>
          </div>

          <div>
            <span className="section-kicker">Socials</span>
            <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">
              <a href="#" className="transition hover:text-stone-950 flex items-center gap-2">
                <span>𝕏</span> X / Twitter
              </a>
              <a href="#" className="transition hover:text-stone-950 flex items-center gap-2">
                <span>📸</span> Instagram
              </a>
              <a href="#" className="transition hover:text-stone-950 flex items-center gap-2">
                <span>💼</span> LinkedIn
              </a>
              <a href="#" className="transition hover:text-stone-950 flex items-center gap-2">
                <span>👤</span> Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section — Copyright + Payment */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-xs text-stone-400">
            © 2025 FÄBERY Collections. All rights reserved.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 mr-1">We accept</span>
            <div className="flex items-center gap-2">
              <div className="border border-stone-200 rounded px-2 py-1 text-xs font-bold text-stone-600">
                VISA
              </div>
              <div className="border border-stone-200 rounded px-2 py-1 text-xs font-bold text-stone-600">
                MC
              </div>
              <div className="border border-stone-200 rounded px-2 py-1 text-xs font-bold text-stone-600">
                UPI
              </div>
              <div className="border border-stone-200 rounded px-2 py-1 text-xs font-bold text-stone-600">
                Razorpay
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}