import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../utils/cartItemsSlice";
import { useEffect } from "react";


const useFetchCart = ()=>{
     const dispatch = useDispatch();
     const userStore = useSelector(store => store?.user);

    const query = useQuery({
    queryKey: ["cart", userStore?._id],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/cart", {
        withCredentials: true,
      });
      return res?.data?.data;
    },
     enabled: !!userStore?._id,
    retry: 2,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(()=>{
    if(query?.data){
         dispatch(addCart(query?.data));
    }
  },[query?.data, dispatch]);
  
  return query;
}

export default useFetchCart;