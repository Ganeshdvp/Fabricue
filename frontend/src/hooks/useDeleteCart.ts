import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useDeleteCart = () => {
  const mutation = useMutation<ApiResponse, Error, string>({
    mutationFn: async (id: string): Promise<ApiResponse> => {
      const res = await axios.delete<ApiResponse>(
        `${BASE_URL}/cart/remove/${id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return mutation;
};

export default useDeleteCart;