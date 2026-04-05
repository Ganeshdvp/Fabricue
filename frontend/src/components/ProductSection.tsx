import { useState, type FC } from "react";
import { HomeCardsContainer } from "./HomeCardsContainer";
import { Pagination } from "./Pagination";
import { PageNotFound } from "./errorAndLoading/PageNotFound";
import useProductSection from "../hooks/useProductSection";
import type { ProductData } from "../types";

interface ProductSectionProps {
  activeCategory: string;
  activeSubCategory: string;
}

interface Data {
  message: string;
  data: ProductData[];
  totalPages: number;
}

export const ProductSection: FC<ProductSectionProps> = ({
  activeCategory,
  activeSubCategory,
}) => {
  const [page, setPage] = useState<number>(1);

  const { data, isPending } = useProductSection({
    activeCategory,
    activeSubCategory,
    page,
  });

  const safeData: Data = data ?? {
    message: "",
    data: [],
    totalPages: 1
  }

  if (isPending)
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rounded-lg p-4 shadow-sm bg-white animate-pulse"
              >
                <div className="w-full h-45 bg-gray-200 rounded-md"></div>

                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );

  return safeData.data.length > 0 ? (
    <>
      <HomeCardsContainer data={safeData.data} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={safeData.totalPages}
      />
    </>
  ) : (
    <PageNotFound title="Products" />
  );
};