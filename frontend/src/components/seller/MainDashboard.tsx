import { HeaderDashboard } from "./HeaderDashboard";
import { MainContent } from "./MainContent";

export const MainDashboard = () => {
  return (
    <>
      <div className="flex flex-col w-full max-h-screen overflow-auto no-scrollbar">
        <HeaderDashboard />

        {/* main content */}
        <MainContent />
      </div>
    </>
  );
};
