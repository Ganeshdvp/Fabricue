import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useEditProfile = () => {
  const mutation = useMutation<ApiResponse, Error, FormData>({
    mutationFn: async (formData: FormData): Promise<ApiResponse> => {
      const res = await axios.patch<ApiResponse>(
        `${BASE_URL}/profile/edit`,
        formData,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return mutation;
};

export default useEditProfile;