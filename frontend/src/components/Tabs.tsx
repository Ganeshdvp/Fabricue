// components/Tabs.jsx
import { useState, type FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCookie } from "../utils/cookieSlice";
import { Cookie } from "./Cookie";
import { HeroSearch } from "./HeroSearch";
import { CategoryTabs } from "./CategoryTabs";
import { SubCategoryBar } from "./SubCategoryBar";
import { ProductSection } from "./ProductSection";
import ChatBot from "./ChatBot";
import type { RootState } from "../types";


export const Tabs: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("");
  const store = useSelector((store: RootState) => store.cookieToggle);
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