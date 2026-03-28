import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import type { ProductData } from "../types";

interface Props {
  activeCategory: string;
  activeSubCategory: string;
  page: number;
}

interface ProductSectionResponse {
  products: ProductData[];
  totalPages: number;
  currentPage: number;
}

interface ApiResponse {
  message: string,
  data: ProductData[],
  totalPages: number
}

const useProductSection = ({
  activeCategory,
  activeSubCategory,
  page,
}: Props) => {
  const query = useQuery<ProductSectionResponse>({
    queryKey: ["product", activeCategory, activeSubCategory, page],
    queryFn: async (): Promise<ProductSectionResponse> => {
      const res = await axios.get<ApiResponse>(
        `${BASE_URL}/product?page=${page}&category=${activeCategory}&subCategory=${activeSubCategory}`,
        { withCredentials: true }
      );
      return res.data;
    },
    enabled: !!activeCategory,
    refetchOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return query;
};

export default useProductSection;