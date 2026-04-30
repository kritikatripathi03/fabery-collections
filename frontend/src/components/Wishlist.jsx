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
      } catch (err) {
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
    } catch (err) {
      setError("Failed to remove item!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading wishlist...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );

  if (wishlist.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <p className="text-2xl font-bold">Your wishlist is empty</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-900 transition"
        >
          Shop Now
        </button>
      </div>
    );

  return (
    <div className="p-10">
      <h1 className="text-4xl font-extrabold mb-10">YOUR WISHLIST</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
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
              className="text-sm text-red-400 hover:text-red-600 transition underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Pagination — outside the grid */}
      <div className="flex flex-wrap gap-8 justify-center items-center font-semibold mt-10">
        <button className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black rounded-md hover:bg-black hover:text-white transition duration-300">
          &larr;
        </button>
        Page 1 of 1
        <button className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black rounded-md hover:bg-black hover:text-white transition duration-300">
          &rarr;
        </button>
      </div>
    </div>
  );
}
