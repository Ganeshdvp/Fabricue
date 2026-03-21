import { BASE_URL } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const useSignUp = ()=>{
    const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + "/user/register", data);
      return res.data;
    },
  });

  return mutation;
}

export default useSignUp;