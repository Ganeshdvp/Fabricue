import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

interface ForgotPasswordData {
  email: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useForgotPassword = () => {
  const mutation = useMutation<ApiResponse, Error, ForgotPasswordData>({
    mutationFn: async (data: ForgotPasswordData): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/user/send-otp`,
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

export default useForgotPassword;