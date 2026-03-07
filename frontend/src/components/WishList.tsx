import { useQuery } from "@tanstack/react-query"
import { Card } from "./Card"
import { Footer } from "./Footer"
import { NavBar } from "./NavBar"
import axios from "axios";
import { BASE_URL } from '../utils/constants.js';
import { useDispatch } from "react-redux";
import {addFavorite} from '../utils/wishListSlice.js';
import {PageNotFound} from './errorAndLoading/PageNotFound.js';


export const WishList = () => {

  const dispatch = useDispatch();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['favorite'],
    queryFn: async ()=>{
      const res = await axios.get(BASE_URL + '/favorite', {
        withCredentials: true
      });
      dispatch(addFavorite(res?.data?.data));
      return res?.data?.data;
    },
    retryOnMount: true,
     retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  })

  return (
    <>
     <NavBar/>
        {
          data?.length > 0 ? (
            <>
            <div className="flex gap-x-2 gap-y-4 flex-wrap p-4 justify-center">
          {
          data?.map((item, index)=>{
            return (
              <Card productData={item} key={index}/>
            )
          })
        }
        </div>
            </>
          ) : <PageNotFound title='Wish List' />
        }
    <Footer/>
    </>
  )
}
