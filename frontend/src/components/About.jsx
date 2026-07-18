import { Link } from "react-router-dom";
import kritika from "../assets/kritika.jpg";
import aboutHero from "../assets/about-hero.jpg";

export default function About() {
  return (
    <div className="overflow-hidden">

      {/* Hero Section — Full width editorial */}
      <div className="relative h-[70vh] w-full">
        <img
          src={aboutHero}
          alt="FABERY Collections"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Text on top */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 opacity-80">
            Est. April 2026
          </p>
          <h1 className="text-6xl font-extrabold tracking-tight mb-6">
            Our Story
          </h1>
          <p className="text-lg max-w-xl leading-8 opacity-80">
            Born with one vision — to make premium fashion accessible,
            intentional, and effortless.
          </p>
        </div>
      </div>

      {/* Why FABERY — tight, no wasted space */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400">
              Why FÄBERY
            </p>
            <h2 className="text-4xl font-bold tracking-tight leading-tight">
              Fashion that never feels like a compromise.
            </h2>
            <p className="text-gray-500 leading-8">
              At FÄBERY Collections, we curate pieces that sit at the
              intersection of comfort, quality, and contemporary style —
              for men, women, kids, and everyone in between.
            </p>
            <p className="text-gray-500 leading-8">
              Every product is handpicked with care. We believe clothing
              is a form of expression, and we're here to make sure yours
              speaks volumes.
            </p>
            <Link
              to="/products"
              className="self-start bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition"
            >
              Shop Collections →
            </Link>
          </div>

          {/* Stats — 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-50 rounded-2xl p-6">
              <p className="text-4xl font-extrabold mb-1">2026</p>
              <p className="text-sm text-gray-400">Year Founded</p>
            </div>
            <div className="bg-stone-50 rounded-2xl p-6">
              <p className="text-4xl font-extrabold mb-1">100+</p>
              <p className="text-sm text-gray-400">Products Curated</p>
            </div>
            <div className="bg-stone-50 rounded-2xl p-6">
              <p className="text-4xl font-extrabold mb-1">4</p>
              <p className="text-sm text-gray-400">Categories</p>
            </div>
            <div className="bg-stone-50 rounded-2xl p-6">
              <p className="text-4xl font-extrabold mb-1">∞</p>
              <p className="text-sm text-gray-400">Style Possibilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 max-w-5xl mx-auto" />

      {/* Founder Section — Left image, Right content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-12 text-center">
          Meet the Founder
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Photo */}
          <div className="relative">
            <img
              src={kritika}
              alt="Kritika Tripathi"
              className="w-full h-[500px] object-cover rounded-3xl"
            />
            {/* Small floating badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-3 shadow-md">
              <p className="text-xs text-gray-400">Founder & CEO</p>
              <p className="font-bold text-sm">FÄBERY Collections</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-2">
                Kritika Tripathi
              </h2>
              <p className="text-gray-400 text-sm">
                Founder, Engineer & Fashion Enthusiast
              </p>
            </div>

            <p className="text-gray-500 leading-8">
              Kritika is a software engineer with a passion for building
              things that matter. FÄBERY Collections was born from her
              love for fashion and technology — a platform that combines
              elegant design with a seamless shopping experience, built
              entirely from scratch.
            </p>

            <p className="text-gray-500 leading-8">
              A batch topper and Google Women Engineers Scholar, Kritika
              brings the same precision and care she applies to engineering
              into every aspect of FÄBERY — from the user experience to
              the products on the shelf.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                "Software Engineer",
                "Google Women Engineer Scholar",
                "AWS Certified Developer",
                "Fashion Enthusiast",
                "CS Graduate — Sharda University",
                "IEEE Published Author"
              ].map((tag) => (
                <span
                  key={tag}
                  className="border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://github.com/kritikatripathi03"
              target="_blank"
              rel="noreferrer"
              className="self-start border border-black text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition"
            >
              View GitHub →
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 max-w-5xl mx-auto" />

      {/* Values Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4 text-center">
          What We Stand For
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col gap-3">
            <span className="text-2xl">✦</span>
            <h3 className="font-bold text-lg">Quality First</h3>
            <p className="text-sm text-gray-500 leading-7">
              Every product is curated with quality in mind. We don't
              compromise on materials, fit, or finish.
            </p>
          </div>
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col gap-3">
            <span className="text-2xl">◈</span>
            <h3 className="font-bold text-lg">Inclusive Style</h3>
            <p className="text-sm text-gray-500 leading-7">
              Fashion for everyone — men, women, kids and accessories.
              Style has no boundaries at FÄBERY.
            </p>
          </div>
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col gap-3">
            <span className="text-2xl">◎</span>
            <h3 className="font-bold text-lg">Seamless Experience</h3>
            <p className="text-sm text-gray-500 leading-7">
              From browsing to checkout — every step is designed to feel
              effortless, fast and enjoyable.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-black text-white rounded-3xl px-10 py-16 flex flex-col items-center text-center gap-6">
          <h2 className="text-3xl font-bold">Ready to explore?</h2>
          <p className="text-gray-400 max-w-md leading-7">
            Discover our latest collections and find your next favourite piece.
          </p>
          <Link
            to="/products"
            className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

    </div>
  );
}