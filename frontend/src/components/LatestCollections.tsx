import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import type { FC } from "react";


interface Collections {
  id: number,
  name: string,
  image: string
}


const collections: Collections[] = [
  {
    id: 1,
    name: "Shirts",
    image: "https://png.pngtree.com/png-clipart/20250507/original/pngtree-shirts-stack-png-image_20945481.png",
  },
  {
    id: 2,
    name: "SweatShirts",
    image: "https://s.alicdn.com/@sc04/kf/H5414d21437b941e3b6099e8731b9c789p/Custom-Baby-Boy-Winter-Coat-Cotton-Baby-Girls-Clothes-Sweatshirts-Without-Hood-Kids-Sweatshirt.jpg",
  },
  {
    id: 3,
    name: "Jeans",
    image: "https://img.pikbest.com/png-images/20250520/stack-of-folded-blue-denim-jeans-clothing-fashion-casual_11722551.png!w700wp",
  },
  {
    id: 4,
    name: "Sleeve Dresses",
    image: "https://m.media-amazon.com/images/I/618eE4YkOAL._AC_UY1000_.jpg",
  },
  {
    id: 5,
    name: "Banins",
    image: "https://www.petite-plume.com/cdn/shop/files/PLWWTT_White_1_637f60fe-6794-4623-a026-0b50a4546ad2.jpg?v=1745417718",
  },
  {
    id: 6,
    name: "Summer Dress",
    image: "https://static.vecteezy.com/system/resources/thumbnails/073/326/394/small/stylish-yellow-wrap-dress-suitable-for-summer-gatherings-or-casual-outings-png.png",
  },
  {
    id: 7,
    name: "Shorts",
    image: "https://i5.walmartimages.com/asr/e11bf80a-bab0-4426-83a5-d3b0d724e6ff.a0ff1712f316ec187f7e377ab9b5ddae.jpeg",
  },
  {
    id: 8,
    name: "Kurta",
    image: "https://png.pngtree.com/png-vector/20250320/ourmid/pngtree-men-s-eid-kurta-shirt-collection-clipart-illustration-png-image_15786179.png",
  },
];

export const LatestCollections: FC = () => {
  return (
    <section className="mt-32 px-4">
      <h1 id="latest-collections" className="text-3xl font-semibold text-center mx-auto">
        Our Latest Collections
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        A visual collection of our most recent fashion - each piece crafted with
        intention, emotion, and style.
      </p>

      <div className="flex flex-wrap items-center justify-center mt-10 gap-6 max-w-7xl mx-auto">
        {collections.map((item: Collections) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="size-56 object-cover object-top"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h2 className="text-xl font-medium">{item.name}</h2>
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
              >
                Show More
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};