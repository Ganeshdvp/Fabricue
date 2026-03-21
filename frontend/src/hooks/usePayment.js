import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const usePayment = ()=>{
    const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + `/payment`, data, {
        withCredentials: true,
      });
      return res?.data;
    }
  });

  return mutation;
}

export default usePayment;