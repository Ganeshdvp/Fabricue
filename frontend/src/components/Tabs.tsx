import { Baby, Grid, LifeBuoyIcon, Search, Shirt, Sparkles, Tag } from "lucide-react"
import { useState } from "react";


export const Tabs = () => {

    const categories = {
    all: ["T-Shirts", "Shirts", "Hoodies", "Jeans", "Jackets", "Blazers", "Shorts", "Sweaters", "Underwears", "Dresses", "Tops", "Skirts", "Sarees", "Kurtis", "Lehengas"],
    men: ["T-Shirts", "Shirts", "Hoodies", "Jeans", "Jackets", "Blazers", "Shorts", "Sweaters", "Underwears"],
    women: ["Dresses", "Tops", "Skirts", "Jeans", "Sarees", "Kurtis", "Lehengas", "Jackets"],
    kid: ["Kids T-Shirts", "Kids Shirts", "Kids Dresses", "Kids Hoodies", "Kids Jackets", "Kids SweatShirts"],
    arrivals: ["Latest Drops", "Trending", "Season Picks"],
    deals: ["50% Off", "Clearance", "Limited Offers"]
  };

  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
    <div className="bg-white min-h-screen -mb-115">

      {/* SEARCH + CATEGORY SECTION */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* Search */}
          <div className="flex items-center gap-2 max-w-xl mx-auto">
            <div className="flex items-center w-full border border-amber-200 rounded-lg px-3 bg-white">
              <Search size={18} className="text-amber-500" />
              <input
                type="text"
                placeholder="Search for products, brands, and styles..."
                className="w-full px-2 py-2.5 text-sm outline-none"
              />
            </div>

            <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">
              <Search size={16} />
              Search
            </button>
          </div>


          {/* Main Category Tabs */}
          <div className="flex items-center justify-center max-w-250 gap-10 mt-12 text-sm font-medium text-gray-600 overflow-x-auto mx-auto">

            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-1 pb-1 ${
                activeCategory === "all"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "hover:text-amber-600"
              }`}
            >
              <Grid size={16} />
              All
            </button>

            <button
              onClick={() => setActiveCategory("men")}
              className={`flex items-center gap-1 pb-1 ${
                activeCategory === "men"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "hover:text-amber-600"
              }`}
            >
              <Shirt size={16} />
              Men
            </button>

            <button
              onClick={() => setActiveCategory("women")}
              className={`flex items-center gap-1 pb-1 ${
                activeCategory === "women"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "hover:text-amber-600"
              }`}
            >
              <LifeBuoyIcon size={16} />
              Women
            </button>

             <button
              onClick={() => setActiveCategory("kid")}
              className={`flex items-center gap-1 pb-1 ${
                activeCategory === "kid"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "hover:text-amber-600"
              }`}
            >
              <Baby size={16} />
              Kids
            </button>

            <button
              onClick={() => setActiveCategory("arrivals")}
              className={`flex items-center gap-1 pb-1 ${
                activeCategory === "arrivals"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "hover:text-amber-600"
              }`}
            >
              <Sparkles size={16} />
              New Arrivals
            </button>

            <button
              onClick={() => setActiveCategory("deals")}
              className={`flex items-center gap-1 pb-1 ${
                activeCategory === "deals"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "hover:text-amber-600"
              }`}
            >
              <Tag size={16} />
              Top Deals
            </button>
          </div>


          {/* Sub Categories */}
          <div className="flex flex-wrap justify-center mx-auto gap-3 mt-4 text-xs max-w-200">
            {categories[activeCategory].map((sub, i) => (
              <button
                key={i}
                className="px-3 py-1.5 bg-white border border-amber-200 rounded-full hover:border-amber-500 hover:text-amber-600 transition"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  )
}
