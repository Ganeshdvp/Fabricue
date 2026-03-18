import {
  Search,
  Sparkles,
} from "lucide-react";
import { Cookie } from "./Cookie.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleCookie } from "../utils/cookieSlice.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { PageNotFound } from "./errorAndLoading/PageNotFound.js";
import { useState } from "react";
import { Pagination } from "./Pagination";
import { Loading } from "./Loading.js";
import { addProduct, removeProduct } from '../utils/productSlice.js';
import { HomeCardsContainer } from "./HomeCardsContainer.js";
import { TabsShimmer } from "./errorAndLoading/TabsShimmer.js";



export const Tabs = () => {
  const [page, setPage] = useState(1);
  const store = useSelector((store) => store.cookieToggle);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const queryClient = useQueryClient();

  // fetching all products based on category
  const { data, isPending } = useQuery({
    queryKey: ["product", [activeCategory, activeSubCategory, page]],
    queryFn: async () => {
      const res = await axios(
        BASE_URL +
          `/product?page=${page}&category=${activeCategory}&subCategory=${activeSubCategory}`,
        {
          withCredentials: true,
        },
      );
      return res?.data;
    },
    refetchOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // search
  const {
    mutate,
    isPending: searchPending,
    isError: searchError,
    error: searchErrorData,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + "/product/search", data, {
        withCredentials: true,
      });
      dispatch(addProduct(res?.data?.data));
      return res?.data?.data;
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['product']});
      setSearchInput('')
    }
  });

  const categories = {
    all: [
      {
        image : '../../public/MenTshirt.webp',
        name : "T-shirts"
      },
      {
        image : '../../public/menShirt.webp',
        name : "Shirts"
      },
      {
        image : '../../public/hoodie.webp',
        name : "Hoodies"
      },
      {
        image : '../../public/MenJeans.webp',
        name : "Jeans"
      },
      {
        image : '../../public/jacket.webp',
        name : "Jackets"
      },
      {
        image : '../../public/blazer.webp',
        name : "Blazers"
      },
      {
        image : '../../public/MensShort.webp',
        name : "Shorts"
      },
      {
        image : '../../public/sweater.webp',
        name : "Sweaters"
      },
      {
        image : '../../public/underwear.webp',
        name : "Underwears"
      },
      {
        image : '../../public/dresses.webp',
        name : "Dresses"
      },
      {
        image : '../../public/tops.webp',
        name : "Tops"
      },
      {
        image : '../../public/skirt.webp',
        name : "Skirts"
      },
      {
        image : '../../public/sarees.webp',
        name : "Sarees"
      },
      {
        image : '../../public/kurti.webp',
        name : "Kurtis"
      },
      {
        image : '../../public/lehenga.webp',
        name : "Lehengas"
      },
    ],
    men: [
      {
        image : '../../public/MenTshirt.webp',
        name : "T-shirts"
      },
      {
        image : '../../public/menShirt.webp',
        name : "Shirts"
      },
      {
        image : '../../public/hoodie.webp',
        name : "Hoodies"
      },
      {
        image : '../../public/MenJeans.webp',
        name : "Jeans"
      },
      {
        image : '../../public/jacket (1).webp',
        name : "Jackets"
      },
      {
        image : '../../public/blazer.webp',
        name : "Blazers"
      },
      {
        image : '../../public/MensShort.webp',
        name : "Shorts"
      },
      {
        image : '../../public/sweater.webp',
        name : "Sweaters"
      },
      {
        image : '../../public/underwear.webp',
        name : "Underwears"
      },
    ],
    women: [
      {
        image : '../../public/dresses.webp',
        name : "Dresses"
      },
      {
        image : '../../public/tops.webp',
        name : "Tops"
      },
      {
        image : '../../public/skirt.webp',
        name : "Skirts"
      },
      {
        image : '../../public/sarees.webp',
        name : "Sarees"
      },
      {
        image : '../../public/kurti.webp',
        name : "Kurtis"
      },
      {
        image : '../../public/lehenga.webp',
        name : "Lehengas"
      },
      {
        image : '../../public/womenJackets.webp',
        name : "Jackets"
      },
      {
        image : '../../public/womenJeans.webp',
        name : "Jeans"
      },
    ],
    kids: [
      {
        image : '../../public/kidsTShirts.webp',
        name : "Kids t-shirts"
      },
      {
        image : '../../public/kidsShirt.webp',
        name : "Kids shirts"
      },
      {
        image : '../../public/kidsDresses.webp',
        name : "Kids dresses"
      },
      {
        image : '../../public/kidsHoodies.webp',
        name : "Kids hoodies"
      },
      {
        image : '../../public/jacket.webp',
        name : "Kids jackets"
      },
      {
        image : '../../public/kidsSweatShirts.webp',
        name : "Kids sweatshirts"
      },
      {
        image : '../../public/sweaters.webp',
        name : "Kids sweaters"
      },
    ],
  };

  // search by name
  const handleSearchClick = () => {
    if (!searchInput || !searchInput.trim()) return;

    const data = {
      search: searchInput,
    };
    mutate(data);
  };

  if (isPending){
    return (
      <>
      <TabsShimmer/>
      </>
    )
  };

  return (
    <>
{/* HERO SEARCH SECTION */}
<div className="bg-white mb-12">
 
  {/* Hero Banner */}
  <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 py-12 text-center">
    <p className="text-[11px] font-semibold text-amber-500 tracking-widest uppercase mb-2">
      Fabricue Store
    </p>
    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
      Find Your Perfect Style
    </h1>
    <p className="text-sm text-gray-400 mb-8">
      Search from thousands of curated clothing items
    </p>
 
    {/* Search Bar */}
    <div className="flex items-stretch gap-2 max-w-xl mx-auto">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 bg-white border-2 border-amber-200 rounded-2xl px-4 focus-within:border-amber-400 transition-colors">
          <Search size={16} className="text-amber-400 flex-shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search or describe what you're looking for..."
            className="w-full py-3.5 text-sm outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
          />
        </div>
        {searchError && (
          <p className="text-red-500 text-[11px] ml-2 mt-1 text-left">
            {searchErrorData?.response?.data?.message}
          </p>
        )}
      </div>
      <button
        onClick={handleSearchClick}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-5 rounded-2xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
      >
        {searchPending ? (
          <Loading />
        ) : (
          <>
            <Sparkles size={15} />
            <span className="hidden sm:inline">AI Search</span>
            <span className="sm:hidden">Search</span>
          </>
        )}
      </button>
    </div>
  </div>
 
  {/* Main Category Tabs */}
  <div className="border-b border-gray-100 bg-white">
    <div className="max-w-2xl mx-auto px-4 flex justify-center gap-1 overflow-x-auto scrollbar-hide">
      {[
        { key: "all", label: "All", img: "../../public/all.webp" },
        { key: "men", label: "Men", img: "../../public/men.webp" },
        { key: "women", label: "Women", img: "../../public/women.webp" },
        { key: "kids", label: "Kids", img: "../../public/kids.webp" },
      ].map(({ key, label, img }) => (
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
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all
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
 
  {/* Sub Categories */}
  <div className="bg-white border-b border-gray-100 py-4 px-4">
    <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2">
      {categories[activeCategory].map((sub, i) => (
        <button
          key={i}
          onClick={() => setActiveSubCategory(sub.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer
            ${activeSubCategory === sub.name
              ? "bg-amber-100 text-amber-700 border border-amber-300 scale-105"
              : "bg-gray-50 text-gray-500 border border-gray-100 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100"
            }`}
        >
          <img src={sub.image} alt={sub.name} className="w-5 h-5 object-contain" />
          {sub.name}
        </button>
      ))}
    </div>
  </div>
 
</div>

        {/* all cards */}
      {data?.data?.length > 0 ? (
        <>
          <HomeCardsContainer data={data?.data} />
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data?.totalPages}
          />
        </>
      ) : (
        <PageNotFound title="Products" />
      )}
      {store && <Cookie setIsActive={() => dispatch(toggleCookie(false))} />}
    </>
  );
};
