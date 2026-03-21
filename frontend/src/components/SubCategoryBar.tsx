import { memo } from "react";

const CATEGORIES = {
  all: [
    { image: "../../public/MenTshirt.webp", name: "T-shirts" },
    { image: "../../public/menShirt.webp",  name: "Shirts" },
    { image: "../../public/hoodie.webp",    name: "Hoodies" },
    { image: "../../public/MenJeans.webp",  name: "Jeans" },
    { image: "../../public/jacket.webp",    name: "Jackets" },
    { image: "../../public/blazer.webp",    name: "Blazers" },
    { image: "../../public/MensShort.webp", name: "Shorts" },
    { image: "../../public/sweater.webp",   name: "Sweaters" },
    { image: "../../public/underwear.webp", name: "Underwears" },
    { image: "../../public/dresses.webp",   name: "Dresses" },
    { image: "../../public/tops.webp",      name: "Tops" },
    { image: "../../public/skirt.webp",     name: "Skirts" },
    { image: "../../public/sarees.webp",    name: "Sarees" },
    { image: "../../public/kurti.webp",     name: "Kurtis" },
    { image: "../../public/lehenga.webp",   name: "Lehengas" },
  ],
  men: [
    { image: "../../public/MenTshirt.webp",   name: "T-shirts" },
    { image: "../../public/menShirt.webp",    name: "Shirts" },
    { image: "../../public/hoodie.webp",      name: "Hoodies" },
    { image: "../../public/MenJeans.webp",    name: "Jeans" },
    { image: "../../public/jacket (1).webp",  name: "Jackets" },
    { image: "../../public/blazer.webp",      name: "Blazers" },
    { image: "../../public/MensShort.webp",   name: "Shorts" },
    { image: "../../public/sweater.webp",     name: "Sweaters" },
    { image: "../../public/underwear.webp",   name: "Underwears" },
  ],
  women: [
    { image: "../../public/dresses.webp",      name: "Dresses" },
    { image: "../../public/tops.webp",         name: "Tops" },
    { image: "../../public/skirt.webp",        name: "Skirts" },
    { image: "../../public/sarees.webp",       name: "Sarees" },
    { image: "../../public/kurti.webp",        name: "Kurtis" },
    { image: "../../public/lehenga.webp",      name: "Lehengas" },
    { image: "../../public/womenJackets.webp", name: "Jackets" },
    { image: "../../public/womenJeans.webp",   name: "Jeans" },
  ],
  kids: [
    { image: "../../public/kidsTShirts.webp",     name: "Kids t-shirts" },
    { image: "../../public/kidsShirt.webp",       name: "Kids shirts" },
    { image: "../../public/kidsDresses.webp",     name: "Kids dresses" },
    { image: "../../public/kidsHoodies.webp",     name: "Kids hoodies" },
    { image: "../../public/jacket.webp",          name: "Kids jackets" },
    { image: "../../public/kidsSweatShirts.webp", name: "Kids sweatshirts" },
    { image: "../../public/sweaters.webp",        name: "Kids sweaters" },
  ],
};

export const SubCategoryBar = memo(({ activeCategory, activeSubCategory, setActiveSubCategory }) => (
  <div className="bg-white border-b border-gray-100 py-4 px-4">
    <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
      {CATEGORIES[activeCategory].map((sub, i) => (
        <button
          key={i}
          onClick={() => setActiveSubCategory(sub.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer
            ${activeSubCategory === sub.name
              ? "bg-amber-100 text-amber-700 border border-amber-300 scale-105"
              : "bg-gray-50 text-gray-500 border border-gray-100 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100"
            }`}
        >
          <img src={sub.image} loading="lazy" decoding="async" alt={sub.name} className="w-5 h-5 object-contain" />
          {sub.name}
        </button>
      ))}
    </div>
  </div>
));