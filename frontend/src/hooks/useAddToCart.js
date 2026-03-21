import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";


const useAddToCart = () => {
  const mutation = useMutation({
    mutationFn: async (_id) => {
      const res = await axios.post(
        BASE_URL + `/cart/add/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      return res?.data;
    },
  });

  return mutation;
};

export default useAddToCart;
