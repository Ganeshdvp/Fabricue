// components/Tabs.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCookie } from "../utils/cookieSlice.js";
import { Cookie } from "./Cookie.js";
import { TabsShimmer } from "./errorAndLoading/TabsShimmer.js";
import { HeroSearch } from "./HeroSearch.jsx";
import { CategoryTabs } from "./CategoryTabs.jsx";
import { SubCategoryBar } from "./SubCategoryBar.jsx";
import { ProductSection } from "./ProductSection.jsx";

export const Tabs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const store = useSelector((store) => store.cookieToggle);
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-white mb-12">
        {/*These three never re-render when products load */}
        <HeroSearch />
        <CategoryTabs
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setActiveSubCategory={setActiveSubCategory}
        />
        <SubCategoryBar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          setActiveSubCategory={setActiveSubCategory}
        />
      </div>

      {/* Only this re-renders on tab/subcategory/page change */}
      <ProductSection
        activeCategory={activeCategory}
        activeSubCategory={activeSubCategory}
      />

      {store && <Cookie setIsActive={() => dispatch(toggleCookie(false))} />}
    </>
  );
};