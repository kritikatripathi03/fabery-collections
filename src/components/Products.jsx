import search from "../assets/search.png";
import ProductCard from "./ProductCard";
import product1 from "../assets/back-tee.jpg";
import product2 from "../assets/jeans-2.jpg";
import product3 from "../assets/front-tee.jpg";
import product4 from "../assets/jeans-3.jpg";

const products = [
  {
    image: product1,
    category: "Cotton T Shirt",
    title: "Basic Slim Fit T-Shirt",
    price: "99",
  },
  {
    image: product2,
    category: "Henley T-Shirt",
    title: "Blurred Print T-Shirt",
    price: "99",
  },
  {
    image: product3,
    category: "Crewneck T-Shirt",
    title: "Full Sleeve Zipper",
    price: "99",
  },
  {
    image: product4,
    category: "Crewneck T-Shirt",
    title: "Full Sleeve Zipper",
    price: "99",
  },
];

export default function Products() {
  return (
    <div>
      <div className="flex gap-16 p-10">
        {/* Filters */}
        <div className="flex flex-col w-64 mt-10">
          <div className="font-bold mt-4">Filters</div>
          <div className="mt-4">
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
          <div className="mt-4">
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
          <div className="mt-4">
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
            PRODUCTS AT FÄBERY
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="lg:w-50 bg-gray-200 py-3 pl-10 pr-4 outline-none"
                />
                {/* Search icon */}
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                  <img src={search} className="h-7 w-8" />
                </span>
              </div>
            </div>
            <div className="flex-1">
              <select
                className="w-40 h-12 border border-black bg-white text-black rounded-md px-2 
               hover:bg-black hover:text-white transition duration-300 cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="popularity">Popularity</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  category={product.category}
                  title={product.title}
                  price={product.price}
                  aspect="aspect-[1/1]"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  category={product.category}
                  title={product.title}
                  price={product.price}
                  aspect="aspect-[1/1]"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  category={product.category}
                  title={product.title}
                  price={product.price}
                  aspect="aspect-[1/1]"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  category={product.category}
                  title={product.title}
                  price={product.price}
                  aspect="aspect-[1/1]"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-8 justify-center items-center font-semibold font-medium">
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                &larr;
              </button>
              Page 1 of 1
              <button
                className="w-8 h-8 border border-black flex items-center justify-center bg-white text-black border rounded-md 
                   hover:bg-black hover:text-white transition duration-300"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
