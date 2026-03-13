export const OrdersShimmer = () => {
  return (
    <>
    <div className="flex flex-col md:grid md:grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-5 items-center border border-gray-200 rounded-xl p-5 bg-white shadow-sm animate-pulse"> {/* Image */} <div className="w-16 h-16 bg-gray-200 rounded-md"></div> {/* Product Info */} <div className="space-y-2 w-full"> <div className="h-4 bg-gray-200 rounded w-3/4"></div> <div className="h-3 bg-gray-200 rounded w-1/2"></div> </div> {/* Address */} <div className="space-y-2 w-full"> <div className="h-3 bg-gray-200 rounded w-3/4"></div> <div className="h-3 bg-gray-200 rounded w-2/3"></div> <div className="h-3 bg-gray-200 rounded w-1/2"></div> </div> {/* Price */} <div className="h-4 bg-gray-200 rounded w-12"></div> {/* Payment */} <div className="h-3 bg-gray-200 rounded w-16"></div> {/* Date */} <div className="h-3 bg-gray-200 rounded w-20"></div> {/* Status */} <div className="h-6 bg-gray-200 rounded w-16"></div> </div>
    </>
  )
}
