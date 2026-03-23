import { memo } from "react";

const CATEGORIES = {
  all: [
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282247/MenTshirt_gashao.webp", name: "T-shirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282243/menShirt_eb0n9b.webp",  name: "Shirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282222/hoodie_xrwxds.webp",    name: "Hoodies" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282240/MenJeans_wj7jhz.webp",  name: "Jeans" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282223/jacket_rm6mmh.webp",    name: "Jackets" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282216/blazer_tqr3fd.webp",    name: "Blazers" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282244/MensShort_s4pujn.webp", name: "Shorts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282256/sweater_awfvca.webp",   name: "Sweaters" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282266/underwear_cgjzs9.webp", name: "Underwears" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282218/dresses_om7oxj.webp",   name: "Dresses" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282260/tops_kxmmqg.webp",      name: "Tops" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282255/skirt_korjow.webp",     name: "Skirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282251/sarees_yysmlu.webp",    name: "Sarees" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282235/kurti_em05mb.webp",     name: "Kurtis" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282237/lehenga_xju9v0.webp",   name: "Lehengas" },
  ],
  men: [
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282247/MenTshirt_gashao.webp", name: "T-shirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282243/menShirt_eb0n9b.webp",  name: "Shirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282222/hoodie_xrwxds.webp",    name: "Hoodies" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282240/MenJeans_wj7jhz.webp",  name: "Jeans" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282223/jacket_rm6mmh.webp",    name: "Jackets" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282216/blazer_tqr3fd.webp",    name: "Blazers" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282244/MensShort_s4pujn.webp", name: "Shorts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282256/sweater_awfvca.webp",   name: "Sweaters" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282266/underwear_cgjzs9.webp", name: "Underwears" },
  ],
  women: [
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282218/dresses_om7oxj.webp",   name: "Dresses" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282260/tops_kxmmqg.webp",      name: "Tops" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282255/skirt_korjow.webp",     name: "Skirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282251/sarees_yysmlu.webp",    name: "Sarees" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282235/kurti_em05mb.webp",     name: "Kurtis" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282237/lehenga_xju9v0.webp",   name: "Lehengas" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282273/womenJackets_yf7rmd.webp", name: "Jackets" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282274/womenJeans_ak4ifq.webp",   name: "Jeans" },
  ],
  kids: [
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282233/kidsTShirts_wnu2js.webp",     name: "Kids t-shirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282230/kidsShirt_rvtvor.webp",       name: "Kids shirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282227/kidsDresses_q44zor.webp",     name: "Kids dresses" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282229/kidsHoodies_tr3ix1.webp",     name: "Kids hoodies" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282223/jacket_rm6mmh.webp",          name: "Kids jackets" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282232/kidsSweatShirts_jdoexf.webp", name: "Kids sweatshirts" },
    { image: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282259/sweaters_ybbdlr.webp",        name: "Kids sweaters" },
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