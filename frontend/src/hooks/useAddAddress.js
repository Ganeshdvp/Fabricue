import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const useAddAddress = ()=>{
    const mutation = useMutation({
    mutationFn: async (data) => {
      await axios.post(BASE_URL + "/profile/address-add", data, {
        withCredentials: true,
      });
    },
  });
  return mutation;
}

export default useAddAddress;