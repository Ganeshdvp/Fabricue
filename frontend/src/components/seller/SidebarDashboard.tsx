import { Search, ChevronDown, Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../types";
import { setContent, setToggle } from "../../utils/SideBarDashboardSlice";
import { Link, useNavigate } from "react-router";
import useLogout from "../../hooks/useLogout";
import { removeUser } from "../../utils/userSlice";
import { removeFavorite } from "../../utils/wishListSlice";
import { removeCart } from "../../utils/cartItemsSlice";
import { removeProduct } from "../../utils/productSlice";
import { removeAddress } from "../../utils/addressSlice";
import { Loading } from "../Loading";

type MenuItem = {
  id: number;
  title: string;
  children?: string[];
};

const menuData: MenuItem[] = [
  { id: 1, title: "Overview" },
  {
    id: 2,
    title: "Orders Management",
    children: ["Orders"],
  },
  {
    id: 3,
    title: "Product Management",
    children: ["Products"],
  },
  {
    id: 4,
    title: "Settings",
    children: ["Profile Info"],
  },
];

export const SidebarDashboard: React.FC = () => {
  const [openDropDown, setOpenDropDown] = useState<number | null>(null);
  const contentStore = useSelector(
    (store: RootState) => store?.sidebarDashboard?.content,
  );
  const toggleStore = useSelector(
    (store: RootState) => store?.sidebarDashboard?.toggle,
  );
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  
    const {mutate, isPending} = useLogout();

    const handleLogout = (): void=>{
        mutate(undefined, {
            onSuccess: ()=>{
            dispatch(removeUser());
            dispatch(removeFavorite());
            dispatch(removeCart());
            dispatch(removeProduct());
            dispatch(removeAddress());
            navigate('/');
        }
        });
    }

  const handleToggle = (id: number, title: string) => {
    if (title === "Overview") {
      dispatch(setContent(title));
    }
    setOpenDropDown((prev) => (prev === id ? null : id)); // toggle open/close
  };

  const handleClick = (selectedContent: string): void => {
    if (selectedContent === contentStore) return;
    dispatch(setContent(selectedContent));
  };

  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    // only for small screens
    if (window.innerWidth >= 768) return;

    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target as Node)
    ) {
      dispatch(setToggle(false))
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [dispatch]);

  return (
    <>
      {toggleStore && (
        <>
          <section ref={sidebarRef} className="fixed top-0 left-0 sm:relative min-w-72 h-screen bg-white shadow-xl border-r z-999">
            <div className="flex flex-col h-full">
              {/* Top Section */}
              <div className="px-4 py-2 flex flex-col gap-1 -mt-2 border-b">
                {/* Logo */}
                <div className="flex items-center justify-between">
                  <Link to="/home">
                  <img
                    src="https://res.cloudinary.com/dyakynych/image/upload/v1774282219/Fabricue_y4qvws.png"
                    className="h-20 w-45 object-contain"
                    alt="dashboard-logo"
                  />
                </Link>
                <Link to="/home">
                  <Home size={32} className="text-amber-600 hover:bg-amber-100 focus:bg-amber-100 p-2 rounded-2xl"/>
                </Link>
                </div>

                {/* Search */}
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full text-sm border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Menu */}
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-xs text-gray-400 uppercase mb-3">
                  Dashboard
                </p>

                <ul className="space-y-2">
                  {menuData.map((item) => (
                    <li key={item.id}>
                      <div
                        onClick={() => handleToggle(item.id, item.title)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item.title}
                        </span>

                        {item.children && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              openDropDown === item.id ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>

                      {/* Dropdown */}
                      {item.children && openDropDown === item.id && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.children.map((child, index) => (
                            <li
                              key={index}
                              onClick={() => handleClick(child)}
                              className="text-sm text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              {child}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}

                  {/* Logout */}
                  <button disabled={isPending} onClick={handleLogout} className="w-full text-left">
                    <li className="px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                    {
                      isPending ? <Loading color="border-red-500"/> : "Logout"
                    }
                  </li>
                  </button>
                </ul>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
