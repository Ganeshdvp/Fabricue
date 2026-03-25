import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import type { AddAddress } from "../types";

interface ApiResponse {
  success: boolean;
  message: string;
  data: AddAddress;
}

const useEditAddress = () => {
  const mutation = useMutation<ApiResponse, Error, AddAddress>({
    mutationFn: async (data: AddAddress): Promise<ApiResponse> => {
      const res = await axios.patch<ApiResponse>(
        `${BASE_URL}/profile/address-edit`,
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

export default useEditAddress;