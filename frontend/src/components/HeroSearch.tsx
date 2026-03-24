import { Search, Sparkles } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { Loading } from "./Loading";
import useSearchAI from "../hooks/useSearchAI";
import useSearching from "../hooks/useSearching";
import { useNavigate } from "react-router";
import type {ProductData} from "../types";

export const HeroSearch: FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [autoSuggestion, setAutoSuggestion] = useState<boolean>(false);
  const [autoSuggestionData, setAutoSuggestionData] = useState<ProductData[]>([]);
  const navigate = useNavigate();

  // search AI
  const {
    mutate: searchAI,
    isPending: searchPending,
    isError: searchError,
    error: searchErrorData,
  } = useSearchAI();

  // debounce on search
  const { mutate: searchingMutate } = useSearching();
  useEffect(() => {
    // skip API call if input is empty
    if (!searchInput.trim()) {
      return setAutoSuggestion(false);
    }
    const timer = setTimeout(() => {
      searchingMutate(
        { query: searchInput },
        {
          onSuccess: (data: ProductData[]) => {
            setAutoSuggestion(true);
            setAutoSuggestionData(data);
          },
          onError: () => {
            setAutoSuggestion(false);
          },
        },
      );
    }, 200);
    // unmount
    return () => clearTimeout(timer);
  }, [searchInput, searchingMutate]);

  // search button
  const handleSearchClick = (): void => {
    if (!searchInput || !searchInput.trim()) return;
    searchAI(
      { search: searchInput },
      {
        onSuccess: () => setSearchInput(""),
      },
    );
  };

  return (
    <div className="bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 px-4 py-12 text-center">
      <p className="text-[11px] font-semibold text-amber-500 tracking-widest uppercase mb-2">
        Fabricue Store
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        Find Your Perfect Style
      </h2>
      <p className="text-sm text-gray-400 mb-8">
        Search from thousands of curated clothing items
      </p>

      <div className="flex flex-col sm:flex-row items-stretch gap-2 max-w-xl mx-auto">
        <div className="flex flex-col flex-1 relative">
          {" "}
          {/* 👈 add relative here */}
          <div className="flex items-center gap-2 bg-white border-2 border-amber-200 rounded-2xl px-4 focus-within:border-amber-400 transition-colors">
            <Search size={16} className="text-amber-400 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search or describe what you're looking for..."
              className="w-full py-3.5 text-sm outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
            />
          </div>
          {autoSuggestion && autoSuggestionData?.length > 0 && (
            <div
              className="absolute top-[110%] left-0 right-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-amber-400
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb:hover]:bg-amber-500"
            >
              {/* 👆 absolute + top-[110%] + left-0 right-0 matches input width */}
              {autoSuggestionData?.map((item) => (
                <div
                  key={item?._id}
                  onClick={() => navigate(`/home/view/${item._id}`)}
                  className="flex items-center gap-x-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all duration-150 border-b border-gray-100 last:border-none"
                >
                  <img
                    src={item?.image[0]}
                    alt={item?.name}
                    className="w-15 h-15 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex flex-col items-start gap-y-1 min-w-0">
                    <h2 className="text-[13px] font-semibold text-gray-800 truncate">
                      {item?.name}
                    </h2>
                    <p className="text-[11px] text-gray-400 truncate">
                      {item?.category}
                    </p>
                    <span className="text-[12px] font-medium text-amber-500">
                      ₹{item?.discountPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {searchError && (
            <p className="text-red-500 text-[11px] ml-2 mt-1 text-left">
              {searchErrorData?.response?.data?.message}
            </p>
          )}
        </div>

        <button
          onClick={handleSearchClick}
          className="flex items-center justify-center gap-2 h-fit w-fit mx-auto py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-5 rounded-2xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap"
        >
          {searchPending ? (
            <Loading color={"border-white"} />
          ) : (
            <>
              <Sparkles size={15} />
              <span>AI Search</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
