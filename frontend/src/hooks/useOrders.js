import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const useOrders = ()=>{
    const store = useSelector(store => store?.user);

    const query = useQuery({
    queryKey: ["order", store?._id],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/orders", {
        withCredentials: true,
      });
      return res?.data?.data;
    },
    enabled: !!store?._id,
    retryOnMount: false,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return query;
}

export default useOrders;