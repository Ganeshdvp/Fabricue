import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const useContact = ()=>{
    const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + "/user/contact", data, {
        withCredentials: true,
      });
      return res?.data;
    },
  });

  return mutation;
}

export default useContact;