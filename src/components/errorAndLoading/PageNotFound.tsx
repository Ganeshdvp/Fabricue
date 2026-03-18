export const PageNotFound = ({title}) => {
  return (
    <>
    <div className="flex flex-col items-center justify-center mt-24 text-sm max-md:px-4">
            <h1 className="text-8xl md:text-8xl font-bold text-amber-500">!</h1>
            <div className="h-1 w-16 rounded bg-amber-500 my-5 md:my-5"></div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">No {title} Found</p>
            <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">The Items you are looking for might have been removed or is temporarily unavailable.</p>
        </div>

    </>
  )
}
