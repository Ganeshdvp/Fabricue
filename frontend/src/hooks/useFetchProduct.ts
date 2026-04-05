import { BASE_URL } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductData } from "../types";

interface Props {
  id: string | undefined;
}

interface ApiResponse {
  data: ProductData;
}

const useFetchProduct = ({ id }: Props) => {
  const query = useQuery<ProductData>({
    queryKey: [`product/${id}`],
    queryFn: async (): Promise<ProductData> => {
      const res = await axios.get<ApiResponse>(
        `${BASE_URL}/product/${id}`,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    },
    enabled: !!id,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return query;
};

export default useFetchProduct;