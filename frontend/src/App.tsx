import type { FC } from "react";
import { Routing } from "./components/Routing";
import useUserCheck from "./hooks/useUserCheck";


const App: FC = () => {

   // fetch user
  const {isLoading} = useUserCheck();

  if(isLoading){
      return (
        <>
        <div className="flex items-center justify-center h-screen">
    <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
  </div>
        </>
    );
  }


  return (
    <Routing/>
  )
}

export default App
