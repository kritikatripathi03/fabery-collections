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

export default function Wishlist() {
  return (
    <div className="p-10">
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
  );
}
