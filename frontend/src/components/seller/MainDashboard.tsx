import { HeaderDashboard } from "./HeaderDashboard"
import { MainContent } from "./MainContent"

export const MainDashboard = () => {
  return (
    <>
    <div className="flex flex-col w-full">
        <HeaderDashboard/>

    {/* main content */}
    <MainContent/>
    </div>
    </>
  )
}
