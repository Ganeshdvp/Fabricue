import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import type { AddAddress } from "../types";

interface ApiResponse {
  data: AddAddress;
}

const useAddAddress = () => {
  const mutation = useMutation<AddAddress, AxiosError<{message: string}>, AddAddress>({
    mutationFn: async (data: AddAddress): Promise<AddAddress> => {
      const res = await axios.post<ApiResponse>(
        `${BASE_URL}/profile/address-add`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data.data;
    },
  });

  return mutation;
};

export default useAddAddress;