import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const useLogout = ()=>{
    const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        BASE_URL + "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return res?.data;
    },
  });
  return mutation;
}

export default useLogout;