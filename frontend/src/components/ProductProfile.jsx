import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ProductProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/products/${id}`);
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    if (!selectedSize && product.sizes.length > 0) {
      return setCartMessage("Please select a size");
    }
    setCartLoading(true);
    setCartMessage("");
    try {
      await axios.post("/cart/add", {
        productId: product._id,
        quantity: 1,
        size: selectedSize || "one-size"
      });
      setCartMessage("Added to cart!");
    } catch {
      setCartMessage("Failed to add to cart");
    } finally {
      setCartLoading(false)
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) return navigate("/login");
    setWishlistLoading(true);
    setWishlistMessage("");
    try {
      await axios.post("/wishlist/add", { productId: product._id });
      setWishlistMessage("Added to wishlist!");
    } catch {
      setWishlistMessage("Failed to add to wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-gray-500">
      Loading product...
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-500">
      {error}
    </div>
  );

  if (!product) return null; 

  return (
    <div className="py-6 lg:py-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

        {/* LEFT SECTION */}
        <div className="surface-card rounded-[2rem] p-4 sm:p-6">
          <div className="flex gap-4 min-h-0">
          {/* THUMBNAILS */}
            <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto pr-1">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 cursor-pointer rounded-xl border object-cover transition hover:opacity-90 ${
                    selectedImage === img ? "border-stone-950" : "border-stone-200"
                  }`}
                />
              ))}
            </div>

          {/* MAIN IMAGE */}
            <div className="flex min-h-[32rem] flex-1 items-center justify-center rounded-[1.75rem] bg-white/70 p-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="surface-card rounded-[2rem] p-6 sm:p-8">
          <div className="space-y-5 overflow-y-auto min-h-0">
          <p className="section-kicker capitalize">
            {product.category}
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
            {product.name}
          </h2>

          <p className="text-2xl font-semibold text-stone-950">₹{product.price}</p>

          <p className="text-sm text-stone-500">MRP incl. of all taxes</p>

          <p className="text-sm leading-7 text-stone-600">{product.description}</p>

          {/* SIZES */}
          {product.sizes.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-700">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`chip px-4 py-2 text-sm ${
                      selectedSize === size
                        ? "chip-active"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock info */}
          <p className={`text-sm font-medium ${product.stock > 0 ? "text-emerald-700" : "text-red-600"}`}>
            {product.stock > 0 ? `In stock (${product.stock} left)` : "Out of stock"}
          </p>

          {/* Cart message */}
          {cartMessage && (
            <p className={`text-sm ${cartMessage.includes("Added") ? "text-emerald-700" : "text-red-600"}`}>
              {cartMessage}
            </p>
          )}

          {/* Wishlist message */}
          {wishlistMessage && (
            <p className={`text-sm ${wishlistMessage.includes("Added") ? "text-emerald-700" : "text-red-600"}`}>
              {wishlistMessage}
            </p>
          )}

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={cartLoading || product.stock === 0}
            className={`w-full py-3 mt-2 font-medium transition ${
              product.stock === 0
                ? "cursor-not-allowed bg-stone-100 text-stone-400"
                : "btn-primary"
            } disabled:opacity-50`}
          >
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>

          {/* ADD TO WISHLIST */}
          <button
            onClick={handleAddToWishlist}
            disabled={wishlistLoading}
            className="btn-secondary w-full py-3 font-medium disabled:opacity-50"
          >
            {wishlistLoading ? "Adding..." : "Add to Wishlist"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}