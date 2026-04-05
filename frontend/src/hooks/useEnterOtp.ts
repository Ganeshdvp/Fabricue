import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";

interface OtpData {
  email?: string;
  otp: string;
  token?: string
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}


const useEnterOtp = () => {
  const mutation = useMutation<ApiResponse, AxiosError<{message: string}>, OtpData>({
    mutationFn: async (data: OtpData): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/user/verify-otp`,
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

export default useEnterOtp;
