import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Outlet } from "react-router";
import { Toaster } from "../components/ui/sonner";


export const Home = () => {

  return (
    <>
    <Toaster position="top-right" richColors />
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
