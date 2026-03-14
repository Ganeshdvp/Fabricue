import { useQuery } from "@tanstack/react-query";
import { Routing } from "./components/Routing"
import axios from "axios";
import { addUser } from './utils/userSlice.js';
import { useDispatch } from "react-redux";
import { BASE_URL } from './utils/constants.js';
import { HeroPageShimmer } from "./components/errorAndLoading/HeroPageShimmer.js";

function App() {

  const dispatch = useDispatch();

   // fetch user
  const {isLoading} = useQuery({
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

  if(isLoading){
      return (
        <>
        <HeroPageShimmer/>
        </>
    );
  }


  return (
    <>
    <Routing/>
    </>
  )
}

export default App
