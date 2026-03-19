import { useQuery } from "@tanstack/react-query"
import { Card } from "./Card"
import axios from "axios";
import { BASE_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from '../utils/wishListSlice.js';
import { PageNotFound } from './errorAndLoading/PageNotFound.js';
import { CardShimmer } from "./errorAndLoading/cardShimmer.js";
import { Heart, Sparkles } from "lucide-react";
 
 
export const WishList = () => {
 
  const dispatch = useDispatch();
  const store = useSelector(store => store?.user);
 
  const { data, isPending } = useQuery({
    queryKey: ['favorite', store?._id],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + '/favorite', {
        withCredentials: true
      });
      dispatch(addFavorite(res?.data?.data));
      return res?.data?.data;
    },
    retryOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
 
  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 md:px-10 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8 animate-pulse">
            <div className="h-3 w-24 bg-amber-100 rounded-full mb-3" />
            <div className="h-7 w-44 bg-gray-200 rounded-xl mb-2" />
            <div className="h-3 w-32 bg-gray-100 rounded-full" />
          </div>
          <div className="flex gap-x-4 gap-y-5 flex-wrap">
            {Array(8).fill(0).map((_, i) => <CardShimmer key={i} />)}
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 lg:px-16 py-10">
      <div className="max-w-7xl mx-auto">
 
        {data?.length > 0 ? (
          <>
            {/* Hero header */}
            <div className="bg-white rounded-2xl border border-gray-100 px-8 py-7 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Heart size={22} className="text-amber-500 fill-amber-100" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-0.5">
                    My Collection
                  </p>
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-tight leading-none">
                    Wishlist
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Items you've saved for later
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-sm font-semibold text-amber-600">
                  {data?.length} {data?.length === 1 ? "item" : "items"} saved
                </span>
              </div>
            </div>
 
            {/* Cards */}
            <div className="flex gap-x-4 gap-y-5 flex-wrap justify-start">
              {data?.map((item, index) => (
                <Card productData={item} key={index} />
              ))}
            </div>
          </>
        ) : (
          <PageNotFound title="Wish List" />
        )}
 
      </div>
    </div>
  );
};