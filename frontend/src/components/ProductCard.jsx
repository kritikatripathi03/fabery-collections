import { useNavigate } from "react-router-dom"

export default function ProductCard({ id, image, category, title, price, aspect = "aspect-[3/4]" }) {
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <div className={`surface-card hover-lift relative overflow-hidden ${aspect}`}>
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <button
          className="absolute bottom-4 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-lg text-stone-950 shadow-lg transition hover:scale-105"
          onClick={() => navigate(`/product/${id}`)}
        >
          +
        </button>
      </div>
      <div className="flex flex-col gap-2 px-1 pt-4">
        <p className="section-kicker capitalize">{category}</p>
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-h-[48px] text-lg font-semibold tracking-tight text-stone-950">{title}</h3>
          <span className="shrink-0 rounded-full bg-stone-950 px-3 py-1 text-sm font-semibold text-white">₹{price}</span>
        </div>
      </div>
    </div>
  )
}