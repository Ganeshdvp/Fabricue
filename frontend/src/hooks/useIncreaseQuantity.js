import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const useIncreaseQuantity = ()=>{
    const mutation = useMutation({
        mutationFn: async (data) => {
          const res = await axios.post(BASE_URL + `/cart/quantity`, data, {
            withCredentials: true,
          });
          return res?.data;
        },
      });

      return mutation;
}

export default useIncreaseQuantity;