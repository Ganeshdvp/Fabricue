import { BASE_URL } from "../utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchProduct = ({id})=>{
    const query = useQuery({
    queryKey: [`product/${id}`],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + `/product/${id}`, {
        withCredentials: true,
      });
      return res?.data?.data;
    },
    enabled: !!id,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return query;
}

export default useFetchProduct;