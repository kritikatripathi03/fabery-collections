import { useNavigate } from "react-router-dom"

export default function ProductCard({ id, image, category, title, price, aspect = "aspect-[3/4]" }) {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <div className={`relative ${aspect} border border-gray-300 bg-white`}>
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-200 w-10 h-10 flex items-center justify-center text-xl"
          onClick={() => navigate(`/product/${id}`)}
        >
          +
        </button>
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <p className="text-gray-500 font-medium text-sm capitalize">{category}</p>
        <div className="flex justify-between items-center mt-1">
          <h3 className="font-extrabold text-lg min-h-[48px]">{title}</h3>
          <span className="font-semibold">₹{price}</span>
        </div>
      </div>
    </div>
  )
}