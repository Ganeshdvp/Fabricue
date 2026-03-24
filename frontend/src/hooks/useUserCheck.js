import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { addUser } from '../utils/userSlice';
import { useDispatch } from "react-redux";
import { BASE_URL } from '../utils/constants';

const useUserCheck = ()=>{
     const dispatch = useDispatch();

    const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/user/check", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data))
      return res?.data?.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true
  });
  return query;
}

export default useUserCheck;