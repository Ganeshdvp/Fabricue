import { useSelector } from "react-redux"
import type { RootState } from "../../types";
import { OverView } from "./OverView";
import { OrdersDashboard } from "./OrdersDashboard";
import { ProductDashboard } from "./ProductDashboard";
import { InventoryDashboard } from "./InventoryDashboard";
import { SelesDashboard } from "./SelesDashboard";
import { Profile } from "../Profile";

export const MainContent = () => {

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
    }{
      content === "Inventory" && <InventoryDashboard/>
    }{
      content === "Sales" && <SelesDashboard/>
    }
    {
      content === "Profile Info" && <Profile/>
    }
    </>
  )
}
