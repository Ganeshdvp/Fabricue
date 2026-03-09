import {
  Baby,
  Grid,
  LifeBuoyIcon,
  Search,
  Shirt,
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
import { Card } from "./Card";
import { Loading } from "./Loading.js";
import { addProduct, removeProduct } from '../utils/productSlice.js';


export const Tabs = () => {
  const [page, setPage] = useState(1);
  const store = useSelector((store) => store.cookieToggle);
  const productStore = useSelector((store) => store.product);
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
      "T-shirts",
      "Shirts",
      "Hoodies",
      "Jeans",
      "Jackets",
      "Blazers",
      "Shorts",
      "Sweaters",
      "Underwears",
      "Dresses",
      "Tops",
      "Skirts",
      "Sarees",
      "Kurtis",
      "Lehengas",
    ],
    men: [
      "T-shirts",
      "Shirts",
      "Hoodies",
      "Jeans",
      "Jackets",
      "Blazers",
      "Shorts",
      "Sweaters",
      "Underwears",
    ],
    women: [
      "Dresses",
      "Tops",
      "Skirts",
      "Jeans",
      "Sarees",
      "Kurtis",
      "Lehengas",
      "Jackets",
    ],
    kids: [
      "Kids t-shirts",
      "Kids shirts",
      "Kids dresses",
      "Kids hoodies",
      "Kids jackets",
      "Kids sweatshirts",
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

  if (isPending) return <p>Loading....</p>;

  return (
    <>
      <div className="bg-white min-h-screen -mb-115">
        {/* SEARCH + CATEGORY SECTION */}
        <section className="">
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
                    className="w-full px-2 py-2.5 text-sm outline-none"
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
                className="flex items-start gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
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
                className={`flex items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "all"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <Grid size={16} />
                All
              </button>

              <button
                onClick={() => {
                  setActiveCategory("men");
                  setActiveSubCategory("");
                  dispatch(removeProduct());
                }}
                className={`flex items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "men"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <Shirt size={16} />
                Men
              </button>

              <button
                onClick={() => {
                  setActiveCategory("women");
                  setActiveSubCategory("");
                  dispatch(removeProduct());
                }}
                className={`flex items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "women"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <LifeBuoyIcon size={16} />
                Women
              </button>

              <button
                onClick={() => {
                  setActiveCategory("kids");
                  setActiveSubCategory("");
                  dispatch(removeProduct());
                }}
                className={`flex items-center gap-1 pb-1 cursor-pointer ${
                  activeCategory === "kids"
                    ? "text-amber-600 border-b-2 border-amber-500"
                    : "hover:text-amber-600"
                }`}
              >
                <Baby size={16} />
                Kids
              </button>
            </div>

            {/* Sub Categories */}
            <div className="flex flex-wrap justify-center mx-auto gap-3 mt-4 text-xs max-w-200">
              {categories[activeCategory].map((sub, i) => (
                <button
                  onClick={() => setActiveSubCategory(sub)}
                  key={i}
                  className={`cursor-pointer px-3 py-1.5 bg-white border border-amber-200 rounded-full hover:border-amber-500 hover:text-amber-600 transition ${activeSubCategory === sub ? "focus:text-amber-600 border-amber-500" : ""}`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

        {/* all cards */}
      {data?.data?.length > 0 ? (
        <>
          <div className="flex gap-x-2 gap-y-4 flex-wrap p-4 mt-8 justify-center">
            {
              productStore ? (
                productStore?.map((item) => {
              return <Card productData={item} key={item._id} />;
            })
              ) : (
                data?.data?.map((item) => {
              return <Card productData={item} key={item._id} />;
            })
              )
            }
          </div>
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
