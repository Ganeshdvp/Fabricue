const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded-xl ${className}`}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

const ProductDashboardShimmer = () => {
  return (
    <div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-2">
              <Shimmer className="h-3 w-20" />
              <Shimmer className="h-6 w-12" />
              <Shimmer className="h-3 w-10" />
            </div>
            <Shimmer className="w-14 h-14 rounded-full" />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Shimmer className="h-10 flex-1" />
        <Shimmer className="h-10 w-32" />
        <Shimmer className="h-10 w-32" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4">

            {/* Image */}
            <Shimmer className="h-28 w-full mb-3 rounded-xl" />

            {/* Title */}
            <Shimmer className="h-4 w-3/4 mb-2" />

            {/* Category */}
            <Shimmer className="h-3 w-1/3 mb-3" />

            {/* Price */}
            <div className="flex gap-2 mb-3">
              <Shimmer className="h-4 w-12" />
              <Shimmer className="h-3 w-10" />
            </div>

            {/* Stock badge */}
            <Shimmer className="h-5 w-20 rounded-full" />

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDashboardShimmer;