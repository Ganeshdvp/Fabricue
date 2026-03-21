import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { addCart } from "../utils/cartItemsSlice";

// fetching all favorite items
const useFetchCartItems = () => {
  const store = useSelector((store) => store?.user);
    const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["cart", store?._id],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/cart", {
        withCredentials: true,
      });
      return res?.data?.data;
    },
    enabled: !!store,
    retryOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(()=>{
    if(query.data){
        dispatch(addCart(query.data));
    }
  }, [query?.data, dispatch]);

  return query;
};

export default useFetchCartItems;
