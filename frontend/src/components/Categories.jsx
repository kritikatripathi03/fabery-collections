import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Categories() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="section-shell pt-0">
      <div className="surface-card rounded-[2rem] px-5 py-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-stone-500">
            <button
              onClick={() => handleCategoryClick("men")}
              className="chip px-4 py-2 hover:chip-active cursor-pointer transition"
            >
              Men
            </button>
            <button
              onClick={() => handleCategoryClick("women")}
              className="chip px-4 py-2 hover:chip-active cursor-pointer transition"
            >
              Women
            </button>
            <button
              onClick={() => handleCategoryClick("kids")}
              className="chip px-4 py-2 hover:chip-active cursor-pointer transition"
            >
              Kids
            </button>
          </div>

          <div className="relative w-full lg:max-w-md">
            <input
              type="text"
              placeholder="Search the collection..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="input-modern py-3 px-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}