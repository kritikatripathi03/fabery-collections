import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "../api/axios";

export default function Collections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products in Collections:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { label: "(All)", value: "all" },
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Kids", value: "kids" },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="section-shell">
      <div className="surface-card rounded-[2.5rem] p-4 sm:p-6 lg:p-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="section-kicker">Collections</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              FÄBERY <br /> Collections <br /> 25-26
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4 border-b border-stone-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`chip cursor-pointer ${
                  selectedCategory === cat.value ? "chip-active" : ""
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-stone-600">
            <div className="chip">Filters (+)</div>
            <div className="chip">
              Sorts (-)
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center text-stone-500">
            Loading collections...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-stone-500">
            No products found
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.images?.[0]}
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
  );
}

