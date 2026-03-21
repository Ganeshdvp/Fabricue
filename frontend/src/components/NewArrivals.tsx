import { Link } from "react-router";

const products = [
  {
    id: 1,
    name: "Polyester Winter Jacket",
    price: 22.00,
    image: "https://tiimg.tistatic.com/fp/1/008/342/comfortable-double-pocket-sleeves-daily-wear-plain-jacket-for-mens-836.jpg",
  },
  {
    id: 2,
    name: "Red Dress for Females",
    price: 29.00,
    image: "https://png.pngtree.com/png-clipart/20250420/original/pngtree-elegant-red-evening-gown-for-special-occasions-png-image_20743177.png",
  },
  {
    id: 3,
    name: "Kids Pant Shirt",
    price: 17.00,
    image: "https://5.imimg.com/data5/SELLER/Default/2022/7/WW/JF/NS/118920094/boys-shirt-pant-set.png",
  },
  {
    id: 4,
    name: "Red & Yellow Lehenga",
    price: 32.00,
    image: "https://wallpapers.com/images/hd/traditional-yellow-blouse-red-lehenga-gold-trim-yipf2tuvnd0v4m43-2.png",
  },
  {
    id: 5,
    name: "Hoodie for Men",
    price: 19.00,
    image: "https://s.alicdn.com/@sc04/kf/H742e968a789e4ab1b0baefcde5ff964fp/Moq-1-Free-Shipping-Streetwear-Blank-Eco-260gsm-Wholesale-100-Polyester-Black-Men-Hooded-Breathable-Plain-Hoodies-Printing-Back.jpg",
  },
];

export const NewArrivals = () => {
  return (
    <section className="mt-36 px-4">
      <h1 className="text-3xl font-medium text-slate-800 text-center mb-2">
        New Arrivals
      </h1>
      <p className="text-slate-500 text-center mb-10">
        Explore the latest additions to our collection.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {products.map((product) => (
          <Link to="/login" key={product.id}>
            <div className="w-56 border border-amber-600 px-4 py-6 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <img
                loading="lazy"
                decoding="async" //  Delays image decoding so it doesn't block the main thread
                className="rounded-lg w-full h-50 object-cover"
                src={product.image}
                alt={product.name}
              />
              <p className="text-sm mt-3 text-slate-700 font-medium truncate">
                {product.name}
              </p>
              <p className="text-sm bg-amber-600 w-fit text-white px-3 py-0.5 rounded mt-1">
                $ {product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
