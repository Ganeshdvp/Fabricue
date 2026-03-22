import { Card } from "./Card";
import { PageNotFound } from './errorAndLoading/PageNotFound';
import { CardShimmer } from "./errorAndLoading/cardShimmer";
import useFetchFavoriteItems from "../hooks/useFetchFavoriteItems";
 
export const WishList = () => {
 
  // fetch favorite
  const { data, isPending } = useFetchFavoriteItems();
 
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
    <div className="min-h-screen px-4 md:px-10 lg:px-16 py-2">
      <div className="max-w-7xl mx-auto">
 
        {data?.length > 0 ? (
          <>
            {/* Hero header */}
            <div className="px-4 py-7 mb-8">
              <div className="flex items-center gap-4">
                <div className="border-2 h-8 rounded-2xl border-amber-500">
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 tracking-tight leading-none">
                    My Wishlist
                  </h1>
                <span className="text-sm text-gray-400">
                  {data?.length} {data?.length === 1 ? "item" : "items"} saved
                </span>
                </div>
              </div>
            </div>
 
            {/* Cards */}
            <div className="flex gap-x-2 sm:gap-x-4 gap-y-5 flex-wrap justify-start">
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