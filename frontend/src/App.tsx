import { useQuery } from "@tanstack/react-query";
import { Routing } from "./components/Routing"
import axios from "axios";
import { addUser } from './utils/userSlice.js';
import { useDispatch } from "react-redux";
import { BASE_URL } from './utils/constants.js';

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
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <>
    <Routing/>
    </>
  )
}

export default App
