import { MainDashboard } from "./MainDashboard";
import { SidebarDashboard } from "./SidebarDashboard";

export const Dashboard = () => {
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
