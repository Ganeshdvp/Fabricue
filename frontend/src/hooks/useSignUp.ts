import { BASE_URL } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useSignUp = () => {
  const mutation = useMutation<ApiResponse, Error, SignUpData>({
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