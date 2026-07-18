import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get("/wishlist");
        setWishlist(data.items || []);
      } catch {
        setError("Failed to load Wishlist!");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      const { data } = await axios.delete(`/wishlist/remove/${itemId}`);
      setWishlist(data.items || []);
    } catch {
      setError("Failed to remove item!");
    }
  };

  if (loading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-stone-500">
        Loading wishlist...
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-600">
        {error}
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-12 text-center">
        <p className="text-2xl font-semibold text-stone-950">Your wishlist is empty</p>
        <button
          onClick={() => navigate("/products")}
          className="btn-primary px-6 py-3 text-sm"
        >
          Shop Now
        </button>
      </div>
    );

  return (
    <div className="py-6 lg:py-10">
      <h1 className="section-title mb-8">Your wishlist</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {wishlist.map((item) => (
          <div key={item._id} className="flex flex-col gap-2">
            <ProductCard
              id={item.product._id}
              image={item.product.images[0]}
              category={item.product.category}
              title={item.product.name}
              price={item.product.price}
              aspect="aspect-[1/1]"
            />
            <button
              onClick={() => handleRemove(item._id)}
              className="text-sm font-medium text-red-600 underline underline-offset-4 transition hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Pagination — outside the grid */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-8 font-semibold">
        <button className="btn-secondary h-10 w-10 p-0">
          &larr;
        </button>
        Page 1 of 1
        <button className="btn-secondary h-10 w-10 p-0">
          &rarr;
        </button>
      </div>
    </div>
  );
}
