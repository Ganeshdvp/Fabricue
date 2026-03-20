// components/HeroSearch.jsx
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { addProduct } from "../utils/productSlice.js";
import { Loading } from "./Loading.js";

export const HeroSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      setSearchInput("");
    },
  });

  const handleSearchClick = () => {
    if (!searchInput || !searchInput.trim()) return;
    mutate({ search: searchInput });
  };

  return (
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
            <Loading color={'border-white'}/>
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
  );
};