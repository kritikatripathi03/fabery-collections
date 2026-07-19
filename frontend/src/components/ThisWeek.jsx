import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "../api/axios";

export default function ThisWeek() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products in ThisWeek:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="section-shell">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="section-kicker">Curated Edit</div>
          <div className="mt-2 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            New <br /> This Week
          </div>
        </div>
        <div className="flex flex-col">
          <a href="/products" className="btn-ghost px-0 text-sm uppercase tracking-[0.24em] text-stone-500">
            See All
          </a>
        </div>
      </div>
      {loading ? (
        <div className="flex h-48 items-center justify-center text-stone-500">
          Loading products...
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.images?.[0]}
              category={product.category}
              title={product.name}
              price={product.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}

