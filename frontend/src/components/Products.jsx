import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter and sort products on frontend
  const filtered = products
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesSize = selectedSize ? p.sizes.includes(selectedSize) : true;
      const matchesMin = minPrice ? p.price >= Number(minPrice) : true;
      const matchesMax = maxPrice ? p.price <= Number(maxPrice) : true;
      return matchesSearch && matchesCategory && matchesSize && matchesMin && matchesMax;
    })
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const categories = ["men", "women", "kids", "accessories"];

  return (
    <div className="py-6 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Filters */}
        <aside className="surface-card rounded-[2rem] p-5 lg:sticky lg:top-6 lg:self-start">
          <div className="section-kicker">Filters</div>

          {/* Size filter */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-700">Size</div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                  className={`chip text-sm ${selectedSize === size ? "chip-active" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-700">Price Range</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                From
                <input
                  type="number"
                  placeholder="₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="input-modern max-w-[90px] px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                To
                <input
                  type="number"
                  placeholder="₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="input-modern max-w-[90px] px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-700">Category</div>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                  className={`chip rounded-2xl px-4 py-3 text-left capitalize ${selectedCategory === cat ? "chip-active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          {(selectedCategory || selectedSize || minPrice || maxPrice) && (
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedSize("");
                setMinPrice("");
                setMaxPrice("");
              }}
                className="mt-6 text-sm font-medium text-red-600 underline underline-offset-4 text-left"
            >
              Clear all filters
            </button>
          )}
          </aside>

        {/* Products */}
          <div className="min-w-0">
            <div className="surface-card rounded-[2rem] px-6 py-6 sm:px-8">
              <div className="section-kicker">Catalog</div>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                Products at FÄBERY
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                Explore curated pieces with a cleaner, more premium browsing experience.
              </p>
            </div>

          {/* Search and Sort */}
            <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-modern py-3 px-4"
                />
              </div>
              <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                  className="select-modern h-full cursor-pointer px-4 py-3"
              >
                <option value="relevance">Relevance</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* States */}
          {loading && (
            <div className="flex h-64 items-center justify-center text-stone-500">
              Loading products...
            </div>
          )}

          {error && (
            <div className="flex h-64 items-center justify-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex h-64 items-center justify-center text-stone-500">
              No products found
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.images[0]}
                  category={product.category}
                  title={product.name}
                  price={product.price}
                  aspect="aspect-[1/1]"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}