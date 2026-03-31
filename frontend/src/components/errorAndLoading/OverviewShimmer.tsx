const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-xl ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

const OverviewShimmer = () => {
  return (
    <div className="p-4 sm:p-6 bg-linear-to-br from-gray-50 via-white to-amber-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3">
        <Shimmer className="h-6 w-40" />
        <Shimmer className="h-4 w-60" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <Shimmer className="h-4 w-24" />
              <Shimmer className="h-10 w-10 rounded-xl" />
            </div>
            <Shimmer className="h-8 w-32 mb-3" />
            <Shimmer className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Chart + Products */}
      <div className="flex flex-col xl:flex-row gap-6 mb-10">
        {/* Chart */}
        <div className="w-full xl:w-2/3 bg-white border rounded-3xl p-6 shadow-sm">
          <Shimmer className="h-4 w-32 mb-4" />
          <Shimmer className="h-75 w-full rounded-xl" />
        </div>

        {/* Products */}
        <div className="w-full xl:w-1/3 bg-white border rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between mb-4">
            <Shimmer className="h-4 w-32" />
            <Shimmer className="h-4 w-16" />
          </div>

          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Shimmer className="w-12 h-12 rounded-xl" />
                <div className="flex-1">
                  <Shimmer className="h-4 w-32 mb-2" />
                  <Shimmer className="h-3 w-20" />
                </div>
                <Shimmer className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="bg-white border rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between mb-4">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-4 w-16" />
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <Shimmer className="h-4 w-40 mb-2" />
                <Shimmer className="h-3 w-24" />
              </div>
              <div className="flex items-center gap-3">
                <Shimmer className="h-4 w-20" />
                <Shimmer className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewShimmer;