import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";

interface ApiResponse {
  success: boolean;
  message: string;
}

const useLogout = () => {
  const mutation = useMutation<ApiResponse, AxiosError<{message: string}>, void>({
    mutationFn: async (): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/user/logout`,
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

export default useLogout;