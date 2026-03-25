import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useAddToCart = () => {
  const mutation = useMutation<ApiResponse, Error, string>({
    mutationFn: async (_id: string): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/cart/add/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return mutation;
};

export default useAddToCart;