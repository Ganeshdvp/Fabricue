import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants.js";
import { addProduct } from "../utils/productSlice.js";
import axios from "axios";   


const useSearchAI = ()=>{
     const dispatch = useDispatch();
    const queryClient = useQueryClient();

      const mutation  = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + "/product/search", data, {
        withCredentials: true,
      });
      return res?.data?.data;
    },
    onSuccess: (data) => {
        dispatch(addProduct(data));
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  return mutation;
}

export default useSearchAI;