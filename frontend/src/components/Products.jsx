import { useState, useEffect } from "react";
import search from "../assets/search.png";
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
      } catch (err) {
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
    <div>
      <div className="flex gap-16 p-10">
        {/* Filters */}
        <div className="flex flex-col w-64 mt-10">
          <div className="font-bold mt-4">Filters</div>

          {/* Size filter */}
          <div className="mt-4">
            <div className="font-medium mb-2">Size</div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                  className={`w-10 h-8 border border-black flex items-center justify-center rounded-md text-sm transition duration-300
                    ${selectedSize === size ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4">
            <div className="font-medium mb-2">Price Range</div>
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-row items-center gap-2">
                From
                <input
                  type="number"
                  placeholder="₹"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-16 h-10 border border-black px-2"
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                To
                <input
                  type="number"
                  placeholder="₹"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-16 h-10 border border-black px-2"
                />
              </div>
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-4">
            <div className="font-medium mb-2">Category</div>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                  className={`border border-black px-4 py-2 rounded-md capitalize transition duration-300
                    ${selectedCategory === cat ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"}`}
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
              className="mt-6 text-sm text-red-500 underline text-left"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="mt-auto text-5xl font-extrabold leading-tight">
            PRODUCTS AT FÄBERY
          </div>

          {/* Search and Sort */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="lg:w-50 bg-gray-200 py-3 pl-10 pr-4 outline-none"
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                  <img src={search} className="h-7 w-8" />
                </span>
              </div>
            </div>
            <div className="flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-40 h-12 border border-black bg-white text-black rounded-md px-2 hover:bg-black hover:text-white transition duration-300 cursor-pointer"
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
            <div className="flex justify-center items-center h-64 text-gray-500">
              Loading products...
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64 text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex justify-center items-center h-64 text-gray-500">
              No products found
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4 mt-4">
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