import { useSelector } from "react-redux"
import type { RootState } from "../../types";
import { OverView } from "./OverView";
import { OrdersDashboard } from "./OrdersDashboard";
import { ProductDashboard } from "./ProductDashboard";
import { Profile } from "../Profile";
import type { FC } from "react";


export const MainContent:FC = () => {

  const content = useSelector((store: RootState)=> store?.sidebarDashboard?.content);

  return (
    <>
    {
      content === "Overview" && <OverView/>
    }
    {
      content === "Orders" && <OrdersDashboard/>
    }{
      content === "Products" && <ProductDashboard/>
    }
    {
      content === "Profile Info" && <Profile/>
    }
    </>
  )
}
