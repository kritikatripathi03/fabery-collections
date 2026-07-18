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
    <div className="section-shell">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="section-kicker">Curated Edit</div>
          <div className="mt-2 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            New <br /> This Week
          </div>
        </div>
        <div className="flex flex-col">
          <a href="#" className="btn-ghost px-0 text-sm uppercase tracking-[0.24em] text-stone-500">
            See All
          </a>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
