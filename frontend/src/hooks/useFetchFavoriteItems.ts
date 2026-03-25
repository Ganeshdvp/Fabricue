import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFavorite } from "../utils/wishListSlice";
import type { ProductData, RootState } from "../types";


type FavoriteResponse = ProductData[];

interface ApiResponse {
  data: FavoriteResponse;
}

const useFetchFavoriteItems = () => {
  const store = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();

  const query = useQuery<FavoriteResponse>({
    queryKey: ["favorite", store?._id],
    queryFn: async (): Promise<FavoriteResponse> => {
      const res = await axios.get<ApiResponse>(`${BASE_URL}/favorite`, {
        withCredentials: true,
      });
      return res.data.data;
    },
    enabled: !!store?._id,
    retryOnMount: false,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (query?.data) {
      dispatch(addFavorite(query?.data));
    }
  }, [query?.data, dispatch]);

  return query;
};

export default useFetchFavoriteItems;