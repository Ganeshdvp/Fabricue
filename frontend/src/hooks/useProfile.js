import { useQuery } from "@tanstack/react-query";;
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAddress } from "../utils/addressSlice";

const useProfile = ()=>{
    const dispatch = useDispatch(); 
     const userStore = useSelector(store => store?.user);

    const query = useQuery({
    queryKey: ["profile", userStore?._id],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      return res?.data?.data[0];
    },
    enabled: !!userStore?._id, 
    retryOnMount: false,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(addAddress(query.data?.address[0]));
    }
  }, [query.data, dispatch]);

  return query;
}

export default useProfile;