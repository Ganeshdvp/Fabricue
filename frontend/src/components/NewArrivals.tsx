import type { FC } from "react";
import { Link } from "react-router";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Polyester Winter Jacket",
    price: 22.0,
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571580/comfortable-double-pocket-sleeves-daily-wear-plain-jacket-for-mens-836_jxuxlc.jpg",
  },
  {
    id: 2,
    name: "Red Dress for Females",
    price: 29.0,
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571581/pngtree-elegant-red-evening-gown-for-special-occasions-png-image_20743177_airsgp.png",
  },
  {
    id: 3,
    name: "Kids Pant Shirt",
    price: 17.0,
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571582/boys-shirt-pant-set_mi4mkr.png",
  },
  {
    id: 4,
    name: "Red & Yellow Lehenga",
    price: 32.0,
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571584/traditional-yellow-blouse-red-lehenga-gold-trim-yipf2tuvnd0v4m43-yipf2tuvnd0v4m43_c9puz0.png",
  },
  {
    id: 5,
    name: "Hoodie for Men",
    price: 19.0,
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571579/Moq-1-Free-Shipping-Streetwear-Blank-Eco-260gsm-Wholesale-100-Polyester-Black-Men-Hooded-Breathable-Plain-Hoodies-Printing-Back_iidcf9.avif",
  },
];

export const NewArrivals: FC = () => {
  return (
    <section
      className="mt-36 px-4"
      aria-labelledby="new-arrivals-heading"
    >
      {/* Heading */}
      <h2
        id="new-arrivals-heading"
        className="text-3xl font-medium text-slate-800 text-center mb-2"
      >
        New Arrivals
      </h2>

      {/* Description */}
      <p className="text-slate-500 text-center mb-10">
        Explore the latest additions to our fashion collection.
      </p>

      {/* Product Grid */}
      <ul className="flex flex-wrap items-center justify-center gap-6">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to="/login"
              aria-label={`View details for ${product.name}`}
              className="block w-56 border border-amber-600 px-4 py-6 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              <img
                loading="lazy"
                decoding="async"
                className="rounded-lg w-full h-50 object-cover"
                src={product.image}
                alt={`${product.name} - premium fashion product`}
                width="224"
                height="200"
              />

              {/* Product Name */}
              <h3 className="text-sm mt-3 text-slate-700 font-medium truncate">
                {product.name}
              </h3>

              {/* Price */}
              <p className="text-sm bg-amber-600 w-fit text-white px-3 py-0.5 rounded mt-1">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};