export default function ProductCard({ image, category, title, price }) {
  return (
    <div className="w-full">
      {/* IMAGE BOX */}
      <div className="relative aspect-[3/4] border border-gray-300 bg-white">
        <img
          src={image}
          alt="Product"
          className="w-full h-full object-contain"
        />

        {/* Floating Plus Button */}
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 
                           bg-gray-200 w-10 h-10 flex items-center 
                           justify-center text-xl"
        >
          +
        </button>
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-col flex-grow mt-4">
        <p className="text-gray-500 text-sm">{category}</p>

        <div className="flex justify-between items-center mt-1">
          <h3 className="font-semibold text-lg min-h-[48px]">{title}</h3>

          <span className="font-semibold">${price}</span>
        </div>
      </div>
    </div>
  );
}
