import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const useProductSection = ({activeCategory, activeSubCategory, page})=>{
    const query = useQuery({
    queryKey: ["product", activeCategory, activeSubCategory, page],
    queryFn: async () => {
      const res = await axios(
        `${BASE_URL}/product?page=${page}&category=${activeCategory}&subCategory=${activeSubCategory}`,
        { withCredentials: true }
      );
      return res?.data;
    },
    enabled: !!activeCategory, 
    refetchOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return query;
}

export default useProductSection;