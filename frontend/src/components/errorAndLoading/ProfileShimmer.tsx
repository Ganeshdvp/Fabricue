import type { FC } from "react"

export const ProfileShimmer: FC = () => {
  return (
    <>
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 py-10 animate-pulse">
      
      {/* PROFILE HEADER SHIMMER */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-28 h-28 rounded-full bg-gray-200"></div>

        <div className="flex-1 space-y-3 w-full">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
          <div className="h-9 bg-gray-200 rounded-full w-32 mt-3"></div>
        </div>
      </div>

      {/* QUICK ACTIONS SHIMMER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-md"
          >
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
              <div className="h-3 bg-gray-200 rounded w-36"></div>
            </div>
          </div>
        ))}
      </div>

      {/* ADDRESS HEADER SHIMMER */}
      <div className="mt-10 flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-40"></div>
        <div className="h-8 bg-gray-200 rounded w-28"></div>
      </div>

      {/* ADDRESS CARDS SHIMMER */}
      <div className="grid md:grid-cols-2 gap-6 mt-5">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-50 p-5 rounded space-y-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-200 rounded w-48"></div>
            <div className="h-3 bg-gray-200 rounded w-36"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>

      {/* ACCOUNT SETTINGS SHIMMER */}
      <div className="bg-white rounded-xl p-6 mt-10 space-y-4">
        <div className="h-5 bg-gray-200 rounded w-40"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </section>
    </>
  )
}
