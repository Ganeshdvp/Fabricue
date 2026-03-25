import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import type { Order, RootState } from "../types";

type OrdersResponse = Order[];

interface ApiResponse {
  data: OrdersResponse;
}


const useOrders = ()=>{
    const store = useSelector((store: RootState) => store?.user);

    const query = useQuery<OrdersResponse>({
    queryKey: ["order", store?._id],
    queryFn: async (): Promise<OrdersResponse> => {
      const res = await axios.get<ApiResponse>(BASE_URL + "/orders", {
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