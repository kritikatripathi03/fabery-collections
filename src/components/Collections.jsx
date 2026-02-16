import product1 from "../assets/back-tee.jpg";
import product2 from "../assets/jeans-2.jpg";
import product3 from "../assets/front-tee.jpg";
import product4 from "../assets/jeans-3.jpg";
import ProductCard from "./ProductCard";

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
  }
];


export default function Collections() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-end justify-between min-h-[150px]">
        <div className="text-5xl font-bold leading-tight">
          FÄBERY <br /> COLLECTIONS <br /> 25-26
        </div>
      </div>
      <div className="w-full flex items-center justify-between py-6 border-b border-gray-200">
        <div className="flex items-baseline gap-8 text-sm">
          <span className="font-semibold">(ALL)</span>
          <span className="text-gray-500 hover:text-black cursor-pointer">
            Men
          </span>
          <span className="text-gray-500 hover:text-black cursor-pointer">
            Women
          </span>
          <span className="text-gray-500 hover:text-black cursor-pointer">
            KID
          </span>
        </div>
        <div className="flex gap-12 text-sm">
          <div className="cursor-pointer hover:underline">Filters(+)</div>

          {/* Sorts */}
          <div className="flex flex-col items-end">
            <div className="cursor-pointer hover:underline">Sorts(-)</div>
            <span className="text-gray-500 text-xs mt-1">Less to more</span>
            <span className="text-gray-500 text-xs">More to Less</span>
          </div>
        </div>
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
    </div>
  );
}
