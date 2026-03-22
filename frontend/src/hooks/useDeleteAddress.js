import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const useDeleteAddress = ()=>{
    const mutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(BASE_URL + `/profile/address-delete/${id}`, {
        withCredentials: true,
      });
    },
  });
  return mutation;
}

export default useDeleteAddress;