import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";   


const useSearching = ()=>{
      const mutation  = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + "/product/searching", data, {
        withCredentials: true,
      });
      return res?.data?.data;
    },
  });

  return mutation;
}

export default useSearching;