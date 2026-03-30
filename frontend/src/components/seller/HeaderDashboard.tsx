import {
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../types";
import { setToggle } from "../../utils/SideBarDashboardSlice";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

export const HeaderDashboard: React.FC<HeaderProps> = () => {

  const content = useSelector((store: RootState)=> store?.sidebarDashboard?.content);
  const toggle = useSelector((store: RootState)=> store?.sidebarDashboard?.toggle);
  const dispatch = useDispatch();


  const onToggleSidebar = (): void=>{
    dispatch(setToggle(!toggle))
  }
  
  return (
    <header className="h-16 bg-white border-b shadow-sm sticky top-0 z-50 py-4">
      
      {/* Inner Container */}
      <div className="flex items-center justify-between h-full px-6">
        
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-800">
              Dashboard
            </h1>
            <p className="text-xs text-gray-400">
              Dashboard / {content}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};