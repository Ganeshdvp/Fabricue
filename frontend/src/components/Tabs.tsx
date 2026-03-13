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
import { CardShimmer } from "./errorAndLoading/cardShimmer.js";


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
        image : '../../public/MenTshirt.png',
        name : "T-shirts"
      },
      {
        image : '../../public/menShirt.png',
        name : "Shirts"
      },
      {
        image : '../../public/hoodie.png',
        name : "Hoodies"
      },
      {
        image : '../../public/MenJeans.png',
        name : "Jeans"
      },
      {
        image : '../../public/jacket.png',
        name : "Jackets"
      },
      {
        image : '../../public/blazer.png',
        name : "Blazers"
      },
      {
        image : '../../public/MensShort.png',
        name : "Shorts"
      },
      {
        image : '../../public/sweater.png',
        name : "Sweaters"
      },
      {
        image : '../../public/underwear.png',
        name : "Underwears"
      },
      {
        image : '../../public/dresses.png',
        name : "Dresses"
      },
      {
        image : '../../public/tops.png',
        name : "Tops"
      },
      {
        image : '../../public/skirt.png',
        name : "Skirts"
      },
      {
        image : '../../public/sarees.png',
        name : "Sarees"
      },
      {
        image : '../../public/kurti.PNG',
        name : "Kurtis"
      },
      {
        image : '../../public/lehenga.png',
        name : "Lehengas"
      },
    ],
    men: [
      {
        image : '../../public/MenTshirt.png',
        name : "T-shirts"
      },
      {
        image : '../../public/menShirt.png',
        name : "Shirts"
      },
      {
        image : '../../public/hoodie.png',
        name : "Hoodies"
      },
      {
        image : '../../public/MenJeans.png',
        name : "Jeans"
      },
      {
        image : '../../public/jacket.png',
        name : "Jackets"
      },
      {
        image : '../../public/blazer.png',
        name : "Blazers"
      },
      {
        image : '../../public/MensShort.png',
        name : "Shorts"
      },
      {
        image : '../../public/sweater.png',
        name : "Sweaters"
      },
      {
        image : '../../public/underwear.png',
        name : "Underwears"
      },
    ],
    women: [
      {
        image : '../../public/dresses.png',
        name : "Dresses"
      },
      {
        image : '../../public/tops.png',
        name : "Tops"
      },
      {
        image : '../../public/skirt.png',
        name : "Skirts"
      },
      {
        image : '../../public/sarees.png',
        name : "Sarees"
      },
      {
        image : '../../public/kurti.PNG',
        name : "Kurtis"
      },
      {
        image : '../../public/lehenga.png',
        name : "Lehengas"
      },
      {
        image : '../../public/womenJackets.png',
        name : "Jackets"
      },
      {
        image : '../../public/womenJeans.png',
        name : "Jeans"
      },
    ],
    kids: [
      {
        image : '../../public/kidsTShirts.png',
        name : "Kids t-shirts"
      },
      {
        image : '../../public/kidsShirt.png',
        name : "Kids shirts"
      },
      {
        image : '../../public/kidsDresses.png',
        name : "Kids dresses"
      },
      {
        image : '../../public/kidsHoodies.png',
        name : "Kids hoodies"
      },
      {
        image : '../../public/jacket.png',
        name : "Kids jackets"
      },
      {
        image : '../../public/kidsSweatShirts.png',
        name : "Kids sweatshirts"
      },
      {
        image : '../../public/sweaters.png',
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
      <div className="bg-white">
        {/* SEARCH + CATEGORY SECTION */}
        <section>
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Search */}
            <div className="flex items-start gap-2 max-w-xl mx-auto mt-6">
              <div className="flex flex-col w-full">
                <div className="flex items-center w-full border border-amber-200 rounded-lg px-3 bg-white">
                  <Search size={18} className="text-amber-500" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    title="Enables Multi-Language Support"
                    placeholder={`Search for products or describe product`}
                    className="w-full px-2 py-3 text-sm outline-none"
                  />
                </div>
                {searchError && (
                  <p className="text-red-600 text-[12px] ml-2">
                    {searchErrorData?.response?.data?.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleSearchClick}
                className="flex items-start gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                {searchPending ? (
                  <p className="mr-4">
                    <Loading />
                  </p>
                ) : (
                  <p className="flex gap-x-1">
                    <Sparkles size={16} />
                    Search
                  </p>
                )}
              </button>
            </div>

            {/* Main Category Tabs */}
            <div className="flex items-center justify-center max-w-250 gap-10 mt-12 text-sm font-medium text-gray-600 overflow-x-auto mx-auto">
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSubCategory("");
                  dispatch(removeProduct());
                }}
                className={`flex flex-col items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "all"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <img src="../../public/all.png" alt="all-icon" 
                className={`${activeCategory === 'all' ? 'bg-amber-400 ' : 'bg-amber-400'} w-20 h-20 rounded-full`}/>
                All
              </button>

              <button
                onClick={() => {
                  setActiveCategory("men");
                  setActiveSubCategory("");
                  dispatch(removeProduct());
                }}
                className={`flex flex-col items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "men"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <img src="../../public/men.png" alt="men-image"
                className={`${activeCategory === 'men' ? 'bg-amber-400 ' : 'bg-amber-400'} w-20 h-20 rounded-full`}/>
                Men
              </button>

              <button
                onClick={() => {
                  setActiveCategory("women");
                  setActiveSubCategory("");
                  dispatch(removeProduct());
                }}
                className={`flex flex-col items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "women"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <img src='../../public/women.png' alt="women-image" className={`${activeCategory === 'women' ? 'bg-amber-400 ' : 'bg-amber-400'} w-20 h-20 object-cover rounded-full`}/>
                Women
              </button>

              <button
                onClick={() => {
                  setActiveCategory("kids");
                  setActiveSubCategory("");
                  dispatch(removeProduct());
                }}
                className={`flex flex-col items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "kids"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <img src="../../public/kids.png" alt="kid-image" className={`${activeCategory === 'kids' ? 'bg-amber-400 ' : 'bg-amber-400'} w-20 h-20 object-contain rounded-full`}/>
                Kids
              </button>
            </div>

            <div className="border-b-1 border-gray-200"></div>

            {/* Sub Categories */}
            <div className="flex flex-wrap justify-center mx-auto gap-3 mt-8 border-b border-gray-200 pb-8 text-xs max-w-200">
              {categories[activeCategory].map((sub, i) => (
                <>
                <button
                  onClick={() => setActiveSubCategory(sub.name)}
                  key={i}
                  className={`flex flex-col items-center cursor-pointer px-2 py-1.5 rounded-full hover:bg-gray-100 transition ${activeSubCategory === sub.name ? "focus:text-amber-600 focus:bg-amber-100 text-amber-600 bg-amber-100 scale-105" : ""}`}
                >
                  <img src={sub.image} alt={sub.name} className="w-15 h-10 object-contain"/>
                  {sub.name}
                </button>
                </>
              ))}
            </div>
          </div>
        </section>
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
