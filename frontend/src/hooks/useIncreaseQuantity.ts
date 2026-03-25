import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

interface QuantityData {
  productId: string;
  quantity: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useIncreaseQuantity = () => {
  const mutation = useMutation<ApiResponse, Error, QuantityData>({
    mutationFn: async (data: QuantityData): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/cart/quantity`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return mutation;
};

export default useIncreaseQuantity;