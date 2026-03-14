export const HeroPageShimmer = () => {
  return (
    <>
    <nav className="flex items-center justify-between px-16 md:px-16 lg:px-24 xl:px-32 py-8 border-gray-300 bg-white animate-pulse">

      {/* Logo */}
      <div className="w-16 h-8 bg-gray-200 rounded"></div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">

        <div className="h-4 w-12 bg-gray-300 rounded"></div>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
        <div className="h-4 w-12 bg-gray-300 rounded"></div>

        {/* Wishlist Icon */}
        <div className="relative">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>

        {/* Cart Icon */}
        <div className="relative">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>

        {/* Profile */}
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

      </div>

      {/* Mobile menu icon */}
      <div className="sm:hidden w-6 h-4 bg-gray-300 rounded"></div>

    </nav>

    <section className="w-full bg-white px-4 pb-10 animate-pulse">
      <div className="w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-20">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-start w-full max-w-xl">

          {/* NEW badge */}
          <div className="h-8 w-44 bg-gray-200 rounded-full mt-20"></div>

          {/* Heading */}
          <div className="mt-6 space-y-3 w-full">
            <div className="h-8 bg-gray-200 rounded w-4/5"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Paragraph */}
          <div className="mt-5 space-y-2 w-full">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2 border border-gray-200 h-13 rounded-full overflow-hidden mt-6 w-full max-w-[440px]">
            <div className="h-full w-full bg-gray-200"></div>
            <div className="h-10 w-32 bg-gray-300 rounded-full mr-2"></div>
          </div>

          {/* Avatars */}
          <div className="flex items-center mt-10">
            <div className="flex -space-x-3 pr-3">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="size-9 rounded-full bg-gray-200 border border-white"
                  ></div>
                ))}
            </div>

            <div className="ml-2 space-y-2">
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 bg-gray-200 rounded"
                    ></div>
                  ))}
              </div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full max-w-md md:max-w-lg">
          <div className="w-full h-[350px] bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </section>
    </>
  );
};