import { useState } from "react";
import product1 from "../assets/back-tee.jpg";
import product2 from "../assets/jeans-2.jpg";
import product3 from "../assets/front-tee.jpg";
import product4 from "../assets/jeans-3.jpg";

export default function ProductProfile() {
  const images = [product1, product2, product4, product3];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];

  return (
    <div className="overflow-hidden flex justify-center items-center">
      <div className="flex gap-20 px-6 py-4 w-full max-w-6xl">
        {/* LEFT SECTION */}
        <div className="flex gap-4 min-h-0">
          {/* THUMBNAILS */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
            {images.map((img, index) => (
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
              alt="product"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="max-w-md space-y-4 overflow-y-auto min-h-0">
          <h2 className="text-lg font-medium tracking-wide">
            ABSTRACT PRINT SHIRT
          </h2>

          <p className="text-base">$99</p>

          <p className="text-sm text-gray-500">MRP incl. of all taxes</p>

          <p className="text-sm text-gray-700">
            Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.
          </p>

          {/* COLORS */}
          <div>
            <p className="text-sm mb-2">Color</p>
            <div className="flex gap-2">
              {[
                "#d1d5db",
                "#9ca3af",
                "#000",
                "#a7f3d0",
                "#e5e7eb",
                "#c7d2fe",
              ].map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 border cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* SIZES */}
          <div>
            <p className="text-sm mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border text-sm ${
                    selectedSize === size ? "border-black" : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={!selectedSize}
            className={`w-full py-3 mt-4 transition ${
              selectedSize
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
