import { memo, type FC } from "react";
import { useDispatch } from "react-redux";
import { removeProduct } from "../utils/productSlice";


interface Tabs {
  key: string,
  label: string,
  img: string
}

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string)=> void;
  setActiveSubCategory: (subCategory: string)=> void;
}


const TAB_LIST: Tabs[] = [
  { key: "all",   label: "All",   img: "https://res.cloudinary.com/dyakynych/image/upload/w_200,q_auto,f_auto/v1774282214/all_kiogly.webp" },
  { key: "men",   label: "Men",   img: "https://res.cloudinary.com/dyakynych/image/upload/w_200,q_auto,f_auto/v1774282239/men_gpykzg.webp" },
  { key: "women", label: "Women", img: "https://res.cloudinary.com/dyakynych/image/upload/w_200,q_auto,f_auto/v1774282270/women_kmupur.webp" },
  { key: "kids",  label: "Kids",  img: "https://res.cloudinary.com/dyakynych/image/upload/w_200,q_auto,f_auto/v1774282226/kids_ltybv5.webp" },
];

export const CategoryTabs:FC<CategoryTabsProps> = memo(({ activeCategory, setActiveCategory, setActiveSubCategory }) => {
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="max-w-2xl mx-auto px-4 flex justify-center gap-1 overflow-x-auto scrollbar-hide">
        {TAB_LIST.map(({ key, label, img }: Tabs) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key);
              setActiveSubCategory("");
              dispatch(removeProduct());
            }}
            className={`flex flex-col items-center gap-2 px-5 sm:px-8 py-4 border-b-2 shrink-0 transition-all cursor-pointer
              ${activeCategory === key
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-400 hover:text-amber-500 hover:border-amber-200"
              }`}
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all
                ${activeCategory === key
                  ? "ring-2 ring-amber-400 ring-offset-2 scale-105"
                  : "ring-1 ring-gray-200"
                }`}
            >
              <img src={img} alt={label} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});