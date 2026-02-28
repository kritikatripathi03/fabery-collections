import Navbar from "./Navbar";

export default function Products() {
  return (
    <div className="flex gap-16 p-10">
      {/* Filters */}
      <div className="flex flex-col w-64 mt-10">
        <div className="flex-1 font-bold mt-4">Filters</div>
        <div className="flex-1 mt-4">
          <div className="flex flex-col">
            <div className="font-medium mb-2">Size</div>
            <div className="flex flex-wrap gap-3">
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                XS
              </button>
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                S
              </button>
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                M
              </button>
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                L
              </button>
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                XL
              </button>
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                XXL
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-4">
          <div className="flex flex-col">
            <div className="font-medium mb-2">Price Range</div>
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-row items-center gap-2">
                From
                <input
                  placeholder="$"
                  className="w-10 h-10 border border-black flex items-center justify-center"
                ></input>
              </div>
              <div className="flex flex-row items-center gap-2">
                To
                <input
                  placeholder="$"
                  className="w-10 h-10 border border-black flex items-center justify-center"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-4">
          <div className="flex flex-col">
            <div className="flex-1 font-medium mt-2 mb-2">Category</div>
            <div className="flex-1 mt-4">
              <div className="flex flex-col gap-3">
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  T-Shirts
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Shirts
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Jeans
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Pants
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Tees
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Shoes
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Sandals
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Accessories
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 mt-4">
          <div className="flex flex-col">
            <div className="flex-1 font-medium mt-2 mb-2">Gender</div>
            <div className="flex-1 mt-4">
              <div className="flex flex-col gap-3">
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Male
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Female
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Boy
                </button>
                <button
                  className="bg-white text-black border border-black px-4 py-2 rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
                >
                  Girl
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="mt-auto text-5xl font-extrabold leading-tight">
          PRODUCTS AT FABERYw
        </div>
      </div>
    </div>
  );
}
