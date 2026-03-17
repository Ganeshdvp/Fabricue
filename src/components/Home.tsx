import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Outlet } from "react-router";



export const Home = () => {

  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
