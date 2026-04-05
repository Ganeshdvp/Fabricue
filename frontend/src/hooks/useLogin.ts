import { BASE_URL } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    email: string;
    fullName: string;
    lockUntil: string | null;
    passwordChangedAt: string;
    role: string;
    failedLoginAttempts: number;
    createdAt: string;
    updatedAt: string;
  };
}

const useLogin = () => {
  const mutation = useMutation<ApiResponse, AxiosError<{message: string}>, LoginData>({
    mutationFn: async (data: LoginData): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/user/login`,
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

export default useLogin;