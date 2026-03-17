export const ViewProductShimmer = () => {
  return (
    <>
    <div className="max-w-6xl w-full px-6 mx-auto mt-20 animate-pulse">
      <div className="flex flex-col md:flex-row gap-16 mt-4">

        {/* LEFT IMAGE SECTION */}
        <div className="flex gap-3">

          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {Array(4).fill(0).map((_, i) => (
              <div
                key={i}
                className="w-24 h-24 bg-gray-200 rounded"
              ></div>
            ))}
          </div>

          {/* Main image */}
          <div className="w-100 h-80 bg-gray-200 rounded"></div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="text-sm w-full md:w-1/2 space-y-4">

          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>

          {/* Subtitle */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>

          {/* Stock */}
          <div className="h-4 w-32 bg-gray-200 rounded"></div>

          {/* Price */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded"></div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="flex gap-4 items-center">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-4 w-6 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="flex gap-3">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="w-10 h-10 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="flex gap-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                  <div className="h-3 w-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="h-3 w-48 bg-gray-200 rounded"></div>
            <div className="h-3 w-56 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-full bg-gray-200 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
          </div>

          {/* Reviews */}
          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="h-3 w-10 bg-gray-200 rounded"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <div className="h-12 w-full bg-gray-200 rounded"></div>
            <div className="h-12 w-full bg-gray-200 rounded"></div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
