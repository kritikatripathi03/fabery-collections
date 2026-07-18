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
    <div className="section-shell">
      <div className="surface-card rounded-[2.5rem] p-4 sm:p-6 lg:p-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="section-kicker">Collections</div>
            <div className="mt-2 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              FÄBERY <br /> Collections <br /> 25-26
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4 border-b border-stone-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="chip chip-active">(All)</span>
            <span className="chip">Men</span>
            <span className="chip">Women</span>
            <span className="chip">Kids</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-stone-600">
            <div className="chip">Filters (+)</div>
            <div className="chip">
              Sorts (-)
            </div>
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
              aspect="aspect-[1/1]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
