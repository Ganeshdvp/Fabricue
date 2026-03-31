import type { FC } from "react";
import { MainDashboard } from "./MainDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

export const Dashboard:FC = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* sidebar */}
        <SidebarDashboard />
        {/* main */}
        <MainDashboard />
      </div>
    </>
  );
};
