import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "../components/ui/sonner";
import type { FC } from "react";
import { Dashboard } from "./seller/Dashboard";

export const Home: FC = () => {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" richColors />
      {location.pathname === "/home/dashboard" ? (
        <Dashboard />
      ) : (
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};
