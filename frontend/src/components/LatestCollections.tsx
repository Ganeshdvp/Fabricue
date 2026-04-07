import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import type { FC } from "react";

interface Collection {
  id: number;
  name: string;
  image: string;
}

const collections: Collection[] = [
  {
    id: 1,
    name: "Shirts",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571936/pngtree-shirts-stack-png-image_20945481_cssvgx.png",
  },
  {
    id: 2,
    name: "Sweatshirts",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571935/Custom-Baby-Boy-Winter-Coat-Cotton-Baby-Girls-Clothes-Sweatshirts-Without-Hood-Kids-Sweatshirt_vf8tmv.avif",
  },
  {
    id: 3,
    name: "Jeans",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571937/stack-of-folded-blue-denim-jeans-clothing-fashion-casual_11722551_po5q5x.webp",
  },
  {
    id: 4,
    name: "Sleeve Dresses",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571936/618eE4YkOAL._AC_UY1000__cjdspy.jpg",
  },
  {
    id: 5,
    name: "Banians",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775572402/men-cotton-vest_b8s1us.jpg",
  },
  {
    id: 6,
    name: "Summer Dress",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775572173/stylish-yellow-wrap-dress-suitable-for-summer-gatherings-or-casual-outings-png_mkiiom.webp",
  },
  {
    id: 7,
    name: "Shorts",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571934/e11bf80a-bab0-4426-83a5-d3b0d724e6ff.a0ff1712f316ec187f7e377ab9b5ddae_evmmqt.webp",
  },
  {
    id: 8,
    name: "Kurta",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_300/v1775571934/pngtree-men-s-eid-kurta-shirt-collection-clipart-illustration-png-image_15786179_sosdvd.png",
  },
];

export const LatestCollections: FC = () => {
  return (
    <section
    id="latest-collections"
      className="mt-32 px-4"
      aria-labelledby="latest-collections-heading"
    >
      {/* Heading */}
      <h2
        id="latest-collections-heading"
        className="text-3xl font-semibold text-center"
      >
        Our Latest Collections
      </h2>

      {/* Description */}
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        A visual collection of our most recent fashion — crafted with style,
        comfort, and elegance.
      </p>

      {/* Grid */}
      <ul className="flex flex-wrap items-center justify-center mt-10 gap-6 max-w-7xl mx-auto">
        {collections.map((item) => (
          <li key={item.id}>
            <article className="relative group rounded-lg overflow-hidden">
              
              {/* Image */}
              <img
                src={item.image}
                alt={`${item.name} fashion collection`}
                loading="lazy"
                decoding="async"
                width="224"
                height="224"
                className="size-56 object-cover object-top"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/50 
                opacity-0 group-hover:opacity-100 
                transition-all duration-300"
              >
                <h3 className="text-xl font-medium">{item.name}</h3>

                <Link
                  to="/login"
                  aria-label={`Explore ${item.name} collection`}
                  className="flex items-center gap-1 text-sm text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
                >
                  Show More
                  <ExternalLink size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};