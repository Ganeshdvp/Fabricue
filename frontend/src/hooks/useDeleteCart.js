import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const useDeleteCart = ()=>{
    const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(BASE_URL + `/cart/remove/${id}`, {
        withCredentials: true,
      });
      return res?.data;
    },
  });

  return mutation;
}

export default useDeleteCart;