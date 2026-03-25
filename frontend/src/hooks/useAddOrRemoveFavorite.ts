import { BASE_URL } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Params {
  type: string;
  _id: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const useAddOrRemoveFavorite = () => {
  const mutation = useMutation<ApiResponse, Error, Params>({
    mutationFn: async ({ type, _id }: Params): Promise<ApiResponse> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/favorite/${type}/${_id}`,
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

export default useAddOrRemoveFavorite;