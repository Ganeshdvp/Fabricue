import type { FC } from "react";

export const CardShimmer: FC = () => {
  return (
    <>
      <div className="w-62.5 rounded-lg p-4 shadow-sm animate-pulse">
        {" "}
        <div className="w-full h-45 bg-gray-200 rounded-md"></div>{" "}
        <div className="mt-4 space-y-2">
          {" "}
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>{" "}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>{" "}
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>{" "}
        </div>{" "}
      </div>
    </>
  );
};
