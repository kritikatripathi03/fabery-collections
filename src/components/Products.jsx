import Navbar from "./Navbar";

export default function Products() {
  return (
    <div className="flex gap-8 p-10">
      {/* Filters */}
      <div className="flex flex-col w-64 mt-10">
        <div className="flex-1 font-bold mt-4">Filters</div>
        <div className="flex-1 mt-4">
          <div className="flex flex-col">
            <div className="font-medium mb-2">Size</div>
            <div className="flex flex-wrap gap-3">
              <button className="w-8 h-8 border border-black flex items-center justify-center">
                XS
              </button>
              <button className="w-8 h-8 border border-black flex items-center justify-center">
                S
              </button>
              <button className="w-8 h-8 border border-black flex items-center justify-center">
                M
              </button>
              <button className="w-8 h-8 border border-black flex items-center justify-center">
                L
              </button>
              <button className="w-8 h-8 border border-black flex items-center justify-center">
                XL
              </button>
              <button className="w-8 h-8 border border-black flex items-center justify-center">
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
        <div className="flex flex-col">
          <div className="flex-1 font-medium mt-2 mb-2">Category</div>
          <div className="flex-1 mt-4">
            <div className="flex flex-col gap-3">
              <button className="border">T-Shirts</button>
              <button className="border">Shirts</button>
              <button className="border">Jeans</button>
              <button className="border">Pants</button>
              <button className="border">Tees</button>
              <button className="border">Shoes</button>
              <button className="border">Sandals</button>
              <button className="border">Accessories</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 font-medium mt-2 mb-2">Gender</div>
          <div className="flex-1 mt-4">
            <div className="flex flex-col gap-3">
              <button className="border">Male</button>
              <button className="border">Female</button>
              <button className="border">Boy</button>
              <button className="border">Girl</button>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="mt-auto text-5xl font-extrabold leading-tight">
          PRODUCTS
        </div>
      </div>
    </div>
  );
}
