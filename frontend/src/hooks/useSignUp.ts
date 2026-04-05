import { BASE_URL } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  role: string
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useSignUp = () => {
  const mutation = useMutation<ApiResponse, AxiosError<{message: string}>, SignUpData>({
    mutationFn: async (data: SignUpData): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/user/register`,
        data
      );
      return res.data;
    },
  });

  return mutation;
};

export default useSignUp;