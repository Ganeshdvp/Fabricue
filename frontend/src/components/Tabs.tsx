// components/Tabs.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCookie } from "../utils/cookieSlice";
import { Cookie } from "./Cookie";
import { HeroSearch } from "./HeroSearch";
import { CategoryTabs } from "./CategoryTabs";
import { SubCategoryBar } from "./SubCategoryBar";
import { ProductSection } from "./ProductSection";
import ChatBot from "./ChatBot";

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

        <ChatBot/>
      {store && <Cookie setIsActive={() => dispatch(toggleCookie(false))} />}
    </>
  );
};