import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import type { ProductData } from "../types";

interface SearchPayload {
  query: string;
}

type SearchResponse = ProductData[];

interface ApiResponse {
  data: SearchResponse;
}

const useSearching = () => {
  const mutation = useMutation<SearchResponse, Error, SearchPayload>({
    mutationFn: async (data: SearchPayload): Promise<SearchResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/product/searching`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    },
  });

  return mutation;
};

export default useSearching;