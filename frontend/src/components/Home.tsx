import { Card } from "./Card"
import { NavBar } from "./NavBar";
import { Pagination } from './Pagination';
import { Footer } from "./Footer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from '../utils/constants.js';
import { PageNotFound } from './errorAndLoading/PageNotFound.js';
import { useState, useEffect } from "react";
import { Tabs } from "./Tabs.js";
import {Cookie} from './Cookie.js';



export const Home = () => {

  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState(false);


  // fetching all products
  const {data, isPending} = useQuery({
    queryKey: ['product', page],
    queryFn: async ()=>{
      const res = await axios(BASE_URL + `/product?page=${page}`, {
        withCredentials: true
      });
      return res?.data
    },
    refetchOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

    useEffect(()=>{
    setTimeout(()=>{
      setIsActive(true);
    },1000)
  },[])


  if(isPending) return <p>Loading....</p>


  return (
    <>
    <NavBar/>
    <Tabs/>
    {
      data?.data?.length > 0 ? (
        <>
        <div className="flex gap-x-2 gap-y-4 flex-wrap p-4 justify-center">
      {
      data?.data?.map((item)=>{
        return (
          <Card productData={item} key={item._id}/>
        )
      })
    }
    </div>
    <Pagination page={page} setPage={setPage} totalPages={data?.totalPages} />
        </>
      ) : <PageNotFound title='Products'/>
    }
    {
      isActive && <Cookie setIsActive={()=> setIsActive(false)}/>
    }
    <Footer/>
    </>
  )
}
