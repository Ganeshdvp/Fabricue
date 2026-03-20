// components/CategoryTabs.jsx
import { memo } from "react";
import { useDispatch } from "react-redux";
import { removeProduct } from "../utils/productSlice.js";

const TAB_LIST = [
  { key: "all",   label: "All",   img: "../../public/all.webp" },
  { key: "men",   label: "Men",   img: "../../public/men.webp" },
  { key: "women", label: "Women", img: "../../public/women.webp" },
  { key: "kids",  label: "Kids",  img: "../../public/kids.webp" },
];

export const CategoryTabs = memo(({ activeCategory, setActiveCategory, setActiveSubCategory }) => {
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="max-w-2xl mx-auto px-4 flex justify-center gap-1 overflow-x-auto scrollbar-hide">
        {TAB_LIST.map(({ key, label, img }) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key);
              setActiveSubCategory("");
              dispatch(removeProduct());
            }}
            className={`flex flex-col items-center gap-2 px-5 sm:px-8 py-4 border-b-2 flex-shrink-0 transition-all cursor-pointer
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
              <img src={img} alt={label} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
});