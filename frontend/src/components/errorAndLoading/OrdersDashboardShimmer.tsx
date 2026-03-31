const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-lg ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

const OrdersDashboardShimmer = () => {
  return (
    <section className="w-full px-4 py-4">
      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6">
          <Shimmer className="h-6 w-48" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <Shimmer className="h-3 w-20 mb-2" />
                <Shimmer className="h-6 w-16" />
              </div>
              <Shimmer className="w-12 h-12 rounded-full" />
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <Shimmer className="h-10 flex-1" />
          <Shimmer className="h-10 w-32" />
          <Shimmer className="h-10 w-32" />
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          {/* Header Row */}
          <div className="hidden md:grid grid-cols-6 px-4 py-3 bg-gray-50">
            {[...Array(6)].map((_, i) => (
              <Shimmer key={i} className="h-3 w-20" />
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="px-4 py-4">

                {/* Desktop Row */}
                <div className="hidden md:grid grid-cols-6 items-center gap-3">
                  <Shimmer className="h-4 w-20" />

                  <div className="flex items-center gap-3">
                    <Shimmer className="w-10 h-10 rounded-md" />
                    <Shimmer className="h-4 w-32" />
                  </div>

                  <Shimmer className="h-4 w-24" />
                  <Shimmer className="h-4 w-20" />
                  <Shimmer className="h-4 w-24" />
                  <Shimmer className="h-6 w-20 rounded-full" />
                </div>

                {/* Mobile Row */}
                <div className="md:hidden flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Shimmer className="w-12 h-12 rounded-md" />
                    <div className="flex-1">
                      <Shimmer className="h-4 w-32 mb-2" />
                      <Shimmer className="h-3 w-20" />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Shimmer className="h-3 w-24" />
                    <Shimmer className="h-3 w-16" />
                  </div>

                  <div className="flex justify-between items-center">
                    <Shimmer className="h-4 w-24" />
                    <Shimmer className="h-6 w-20 rounded-full" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersDashboardShimmer;