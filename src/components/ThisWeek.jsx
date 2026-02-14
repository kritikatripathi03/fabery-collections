import ProductCard from "./ProductCard";
import tshirt1 from "../assets/t-shirt-1.jpg";
import tshirt2 from "../assets/t-shirt-2.jpg";
import tshirt3 from "../assets/t-shirt-3.jpg";
import tshirt4 from "../assets/t-shirt-4.png";

const products = [
  {
    image: tshirt1,
    category: "V-Neck T-Shirt",
    title: "Embroidered Seersucker Shirt",
    price: "99",
  },
  {
    image: tshirt2,
    category: "Cotton T Shirt",
    title: "Basic Slim Fit T-Shirt",
    price: "99",
  },
  {
    image: tshirt3,
    category: "Henley T-Shirt",
    title: "Blurred Print T-Shirt",
    price: "99",
  },
  {
    image: tshirt4,
    category: "Crewneck T-Shirt",
    title: "Full Sleeve Zipper",
    price: "99",
  },
];

export default function ThisWeek() {
  return (
    <div>
      <div className="flex items-end justify-between px-4 py-4 min-h-[150px]">
        <div className="text-5xl font-bold leading-tight">
          NEW <br /> THIS WEEK
        </div>
        <div className="flex flex-col">
          <a href="#" className="mt-auto text-gray-600 hover:underline">
            See All
          </a>
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
            />
          ))}
        </div>
      </div>
  );
}
