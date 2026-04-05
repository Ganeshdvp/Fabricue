import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";

interface PasswordData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useEnterPassword = () => {
  const mutation = useMutation<ApiResponse, AxiosError<{message: string}>, PasswordData>({
    mutationFn: async (data: PasswordData): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/user/change-password`,
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

export default useEnterPassword;