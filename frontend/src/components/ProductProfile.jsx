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
      } catch (err) {
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
    } catch (err) {
      setCartMessage(err.response?.data?.message || "Failed to add to cart");
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
    } catch (err) {
      setWishlistMessage(err.response?.data?.message || "Failed to add to wishlist");
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
    <div className="overflow-hidden flex justify-center items-center">
      <div className="flex gap-20 px-6 py-4 w-full max-w-6xl">

        {/* LEFT SECTION */}
        <div className="flex gap-4 min-h-0">
          {/* THUMBNAILS */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setSelectedImage(img)}
                className={`w-16 cursor-pointer border ${
                  selectedImage === img ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="w-[400px] h-[500px] flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="max-w-md space-y-4 overflow-y-auto min-h-0">
          <p className="text-xs text-gray-400 uppercase tracking-widest capitalize">
            {product.category}
          </p>

          <h2 className="text-2xl font-bold tracking-wide">
            {product.name}
          </h2>

          <p className="text-xl font-semibold">₹{product.price}</p>

          <p className="text-sm text-gray-500">MRP incl. of all taxes</p>

          <p className="text-sm text-gray-700">{product.description}</p>

          {/* SIZES */}
          {product.sizes.length > 0 && (
            <div>
              <p className="text-sm mb-2 font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border text-sm transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock info */}
          <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? `In stock (${product.stock} left)` : "Out of stock"}
          </p>

          {/* Cart message */}
          {cartMessage && (
            <p className={`text-sm ${cartMessage.includes("Added") ? "text-green-600" : "text-red-500"}`}>
              {cartMessage}
            </p>
          )}

          {/* Wishlist message */}
          {wishlistMessage && (
            <p className={`text-sm ${wishlistMessage.includes("Added") ? "text-green-600" : "text-red-500"}`}>
              {wishlistMessage}
            </p>
          )}

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            disabled={cartLoading || product.stock === 0}
            className={`w-full py-3 mt-2 font-medium transition ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            } disabled:opacity-50`}
          >
            {cartLoading ? "Adding..." : "Add to Cart"}
          </button>

          {/* ADD TO WISHLIST */}
          <button
            onClick={handleAddToWishlist}
            disabled={wishlistLoading}
            className="w-full py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition disabled:opacity-50"
          >
            {wishlistLoading ? "Adding..." : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}