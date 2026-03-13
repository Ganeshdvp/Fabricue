export const TabsShimmer = () => {
  return (
    <>
    <div className="bg-white animate-pulse">
  <section>
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* SEARCH BAR */}
      <div className="flex items-start gap-2 max-w-xl mx-auto mt-6">
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full border border-gray-200 rounded-lg px-3 py-5 bg-gray-100"></div>
        </div>

        <div className="h-10 w-28 bg-gray-100 rounded-lg"></div>
      </div>

      {/* MAIN CATEGORY TABS */}
      <div className="flex items-center justify-center gap-10 mt-12 overflow-x-auto mx-auto">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 bg-gray-100 rounded-full"></div>
            </div>
          ))}
      </div>

      <div className="border-b border-gray-200 mt-6"></div>

      {/* SUB CATEGORIES */}
      <div className="flex flex-wrap justify-center mx-auto gap-3 mt-8 border-b border-gray-200 pb-8">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center px-3 py-2">
              <div className="w-14 h-10 bg-gray-100 rounded"></div>
            </div>
          ))}
      </div>
    </div>
  </section>

  {/* PRODUCT CARDS */}
  <div className="max-w-7xl mx-auto px-4 py-10">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="rounded-lg p-4 shadow-sm bg-white animate-pulse"
          >
            <div className="w-full h-[180px] bg-gray-200 rounded-md"></div>

            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>
    </>
  )
}
