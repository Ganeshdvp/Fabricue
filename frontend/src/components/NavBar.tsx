import { useEffect, useRef, useState } from "react";
import { Heart, User2Icon } from "lucide-react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDropDown } from "./ProfileDropDown";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { addFavorite } from "../utils/wishListSlice.js";
import { addCart } from "../utils/cartItemsSlice.js";

export const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const store = useSelector((store) => store.user);
  const wishList = useSelector((store) => store?.wishList);
  const cartItems = useSelector((store) => store?.cartItems);
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null);

  // fetch favorite items
  const { data: favoriteData, isPending: favoritePending } = useQuery({
    queryKey: ["favorite"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/favorite", {
        withCredentials: true,
      });
      dispatch(addFavorite(res?.data?.data));
      return res?.data?.data;
    },
    retryOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // fetch cart Items
  const { data: cartData, isPending: cartPending } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/cart", {
        withCredentials: true,
      });
      dispatch(addCart(res?.data?.data));
      return res?.data?.data;
    },
    retryOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const handleProfileClick = () => {
    setDropDown(!dropDown);
  };


  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
        setDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

     return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  },[])

  return (
    <>
      <nav ref={dropDownRef} className="flex items-center justify-between px-16 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <img
          src="../../public/Fabricue.png"
          alt="logo"
          className="w-15 h-auto object-contain scale-300"
        />

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8 text-sm">
          <Link to="/home">Home</Link>
          <a href="#about">About</a>
          {!store && (
            <>
              <a href="#new-arrivals">New Arrivals</a>
              <a href="#latest-collections">Latest Collections</a>
              <a href="#top-collections">Top Collections</a>
            </>
          )}
          <a href="#faqs">FAQs</a>
          <a href="#contact">Contact</a>

          {store ? (
            <>
              {/* search feild */}
              {/* <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input
                  className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                  type="text"
                  placeholder="Search products"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.836 10.615 15 14.695"
                    stroke="#7A7B7D"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                    stroke="#7A7B7D"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div> */}

              {/* wishlist */}
              <Link to="/home/wishlist">
                <div className="relative cursor-pointer hover:scale-110">
                  <Heart size={16} />
                  <button className="absolute -top-2 -right-3 text-xs text-white bg-amber-500 w-4.5 h-4.5 rounded-full">
                    {wishList?.length || 0}
                  </button>
                </div>
              </Link>

              {/* cart */}
              <Link to="/home/cart">
                <div className="relative cursor-pointer hover:scale-110">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                      stroke="#615fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <button className="absolute -top-2 -right-3 text-xs text-white bg-amber-500 w-4.5 h-4.5 rounded-full">
                    {cartItems?.length || 0}
                  </button>
                </div>
              </Link>
            </>
          ) : (
            ""
          )}

          {store ? (
            <>
              <User2Icon
                size={30}
                onClick={handleProfileClick}
                className="cursor-pointer hover:bg-amber-500 hover:text-white rounded-full p-1"
              />
              {/* profile dropdown */}
              {dropDown && (
                <div className="z-100 absolute top-13 right-6 md:right-16 lg:right-24 xl:right-32">
                  <ProfileDropDown />
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="cursor-pointer px-8 py-2 bg-amber-500 hover:bg-amber-600 transition text-white rounded-full">
                Login
              </button>
            </Link>
          )}
        </div>

        <button
          onClick={() => (toggle ? setToggle(false) : setToggle(true))}
          aria-label="Menu"
          className="sm:hidden"
        >
          {/* Menu Icon SVG */}
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect
              x="6"
              y="13"
              width="15"
              height="1.5"
              rx=".75"
              fill="#426287"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${toggle ? "flex" : "hidden"} absolute top-15 left-0 z-10 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <Link to="/home" className="block">
            Home
          </Link>
          <a href="#about" className="block">
            About
          </a>
          {!store && (
            <>
              <a href="#new-arrivals" className="block">
                New Arrivals
              </a>
              <a href="#latest-collections" className="block">
                Latest Collections
              </a>
              <a href="#top-collections" className="block">
                Top Collections
              </a>
            </>
          )}
          <a href="#faqs" className="block">
            FAQs
          </a>
          <a href="#contact" className="block">
            Contact
          </a>
          <Link to="/login">
            <button className="cursor-pointer block px-6 py-2 mt-2 bg-amber-500 hover:bg-amber-600 transition text-white rounded-full text-sm">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};
