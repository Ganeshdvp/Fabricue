export const CartShimmer = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row py-16 max-w-7xl w-full px-6 mx-auto gap-10 animate-pulse">

  {/* LEFT SIDE - CART ITEMS */}
  <div className="flex-1 max-w-4xl space-y-6">

    {Array(3).fill(0).map((_, i) => (
      <div
        key={i}
        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center pt-3"
      >

        {/* Product */}
        <div className="flex items-center md:gap-6 gap-3">
          <div className="w-24 h-24 bg-gray-200 rounded"></div>

          <div className="space-y-2 w-full">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>

            <div className="flex items-center gap-2 mt-2">
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="flex justify-center">
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
        </div>

        {/* Color */}
        <div className="flex justify-center">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
        </div>

        {/* Total */}
        <div className="flex justify-center">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    ))}

  </div>

  {/* RIGHT SIDE - ORDER SUMMARY */}
  <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border border-gray-300/70">

    <div className="h-6 w-40 bg-gray-300 rounded"></div>

    <hr className="border-gray-300 my-5" />

    <div className="mb-6">
      <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>

      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
      </div>

      <div className="h-3 w-16 bg-gray-300 rounded mt-3"></div>

      <div className="h-4 w-36 bg-gray-300 rounded mt-6"></div>
      <div className="h-10 w-full bg-gray-300 rounded mt-2"></div>
    </div>

    <hr className="border-gray-300" />

    <div className="mt-4 space-y-3">
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-gray-300 rounded"></div>
        <div className="h-3 w-16 bg-gray-300 rounded"></div>
      </div>

      <div className="flex justify-between">
        <div className="h-3 w-24 bg-gray-300 rounded"></div>
        <div className="h-3 w-12 bg-gray-300 rounded"></div>
      </div>

      <div className="flex justify-between">
        <div className="h-3 w-20 bg-gray-300 rounded"></div>
        <div className="h-3 w-14 bg-gray-300 rounded"></div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>

    <div className="h-12 w-full bg-gray-300 rounded mt-6"></div>
  </div>

</div>
    </>
  );
};
