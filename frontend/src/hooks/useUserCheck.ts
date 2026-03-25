import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { addUser } from '../utils/userSlice';
import { useDispatch } from "react-redux";
import { BASE_URL } from '../utils/constants';
import type { User } from "../types";


interface ApiResponse {
  data: User;
}

const useUserCheck = ()=>{
     const dispatch = useDispatch();

    const query = useQuery<User>({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const res = await axios.get<ApiResponse>(BASE_URL + "/user/check", {
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