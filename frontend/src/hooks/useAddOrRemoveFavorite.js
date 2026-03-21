import { BASE_URL } from "../utils/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";


const useAddOrRemoveFavorite = ()=>{
    const mutation = useMutation({
    mutationFn: async ({type, _id}) => {
      const res = await axios.post(
        BASE_URL + `/favorite/${type}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      return res?.data;
    },
  });
  return mutation;
}

export default useAddOrRemoveFavorite;