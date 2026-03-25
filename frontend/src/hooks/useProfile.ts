import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAddress } from "../utils/addressSlice";
import type { Address, RootState } from "../types";


interface Profile {
  _id: string;
  userId: string,
  address: Address[];
  image: string
}

interface ApiResponse {
  data: Profile[];
}

const useProfile = () => {
  const dispatch = useDispatch();
  const userStore = useSelector((store: RootState) => store.user);

  const query = useQuery<Profile>({
    queryKey: ["profile", userStore?._id],
    queryFn: async (): Promise<Profile> => {
      const res = await axios.get<ApiResponse>(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      return res.data.data[0];
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
      dispatch(addAddress(query.data.address[0]));
    }
  }, [query.data, dispatch]);

  return query;
};

export default useProfile;