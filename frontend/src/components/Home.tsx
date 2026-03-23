import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Outlet } from "react-router";
import { Toaster } from "../components/ui/sonner";
import type { FC } from "react";


export const Home: FC = () => {

  return (
    <>
    <Toaster position="top-right" richColors />
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
