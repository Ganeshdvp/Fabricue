import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import { addProduct } from "../utils/productSlice";
import axios from "axios";
import type { ProductData } from "../types";

interface SearchPayload {
  query: string;
}

type SearchResponse = ProductData[];

interface ApiResponse {
  data: SearchResponse;
}

const useSearchAI = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation<SearchResponse, Error, SearchPayload>({
    mutationFn: async (data: SearchPayload): Promise<SearchResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/product/search`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    },
    onSuccess: (data: SearchResponse) => {
      dispatch(addProduct(data));
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  return mutation;
};

export default useSearchAI;