import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { Heart, ShoppingCart, User2Icon } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { ProfileDropDown } from "./ProfileDropDown";
import { Loading } from "./Loading";
import useFetchFavoriteItems from "../hooks/useFetchFavoriteItems";
import useFetchCart from "../hooks/useFetchCart"


interface User {
  user: {
    _id: string | null
  }
}

interface WishList {
  wishList: {
    _id: string | null
  }[]
}

interface CartItems {
  cartItems: {
    _id: string | null
  }[]
}

interface BadgeProps {
  count: ReactNode;
}


const Badge: FC<BadgeProps> = ({ count }) => (
    <span className="absolute -top-2 -right-2.5 min-w-4.5 h-4.5 flex items-center justify-center text-[10px] font-semibold text-white bg-amber-500 rounded-full px-0.5">
      {count}
    </span>
  );


export const NavBar: FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const store = useSelector((store: User) => store?.user);
  const wishList = useSelector((store: WishList) => store.wishList);
  const cartItems = useSelector((store: CartItems) => store.cartItems);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLElement | null>(null);

  // fetch favorite items
  useFetchFavoriteItems();

  // fetch cart Items
  useFetchCart();

  const handleProfileClick = (): void => {
    setDropDown(!dropDown);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropDownRef.current && !dropDownRef.current.contains(target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkCls: string = "text-sm text-gray-600 hover:text-amber-500 transition-colors font-medium";

  return (
    <>
      <nav
        ref={dropDownRef}
        className="sticky top-0 z-50 flex items-center justify-between max-w-screen px-16 sm:px-20 md:px-20 lg:px-20 xl:px-24 py-5 bg-white border-b border-gray-200 transition-all"
      >
        {/* Logo */}
        <Link to='/home'>
        <img
          src="https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282219/Fabricue_y4qvws.png"
          alt="logo"
          className="w-15 h-auto object-contain scale-300"
        />
        </Link>

        {/* Desktop Menu */}
        <div className={`${store ? 'md:flex' : 'lg:flex'} hidden items-center gap-7 text-sm`}>
          <Link to="/home" className={navLinkCls}>Home</Link>

          {!store && (
            <>
              <a href="#about" className={navLinkCls}>About</a>
              <a href="#new-arrivals" className={navLinkCls}>New Arrivals</a>
              <a href="#latest-collections" className={navLinkCls}>Latest Collections</a>
              <a href="#top-collections" className={navLinkCls}>Top Collections</a>
              <a href="#faqs" className={navLinkCls}>FAQs</a>
              <a href="#contact" className={navLinkCls}>Contact</a>
            </>
          )}

          {store && (
            <>
              <Link to="/home/about" className={navLinkCls}>About</Link>
              <Link to="/home/faqs" className={navLinkCls}>FAQS</Link>
              <Link to="/home/contact" className={navLinkCls}>Contact</Link>

              {/* Wishlist */}
              <Link to="/home/wishlist">
                <div className="relative cursor-pointer hover:scale-110 transition-transform p-1">
                  <Heart size={18} className="text-gray-600 hover:text-amber-500 transition-colors" />
                  <Badge count={!wishList ? <Loading color={'border-white'} /> : wishList?.length || 0} />
                </div>
              </Link>

              {/* Cart */}
              <Link to="/home/cart">
                <div className="relative cursor-pointer hover:scale-110 transition-transform p-1">
                  <ShoppingCart size={18} className="text-gray-600 hover:text-amber-500 transition-colors" />
                  <Badge count={!cartItems ? <Loading color="border-white"/> : cartItems?.length || 0} />
                </div>
              </Link>
            </>
          )}

          {store ? (
            <>
              <button
                onClick={handleProfileClick}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <User2Icon size={16} className="text-gray-600 hover:text-amber-500" />
              </button>
              {dropDown && (
                <div className="z-100 absolute top-14 right-6 md:right-10 lg:right-16 xl:right-24">
                  <ProfileDropDown />
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="cursor-pointer px-6 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 transition-colors text-white text-sm font-medium rounded-xl shadow-sm shadow-amber-100">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`${toggle ? "flex" : "hidden"} absolute top-full left-0 z-50 w-full bg-white border-b border-gray-100 shadow-md py-5 flex-col items-start gap-1 px-6 lg:hidden`}
        >
          {[
            { label: "Home", to: "/home", isLink: true },
            { label: "About", href: "#about" },
            ...(!store ? [
              { label: "New Arrivals", href: "#new-arrivals" },
              { label: "Latest Collections", href: "#latest-collections" },
              { label: "Top Collections", href: "#top-collections" },
            ] : []),
            { label: "FAQs", href: "#faqs" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, to, href, isLink }) =>
            isLink ? (
              <Link key={label} to={to} className="block w-full py-2.5 text-sm text-gray-700 font-medium hover:text-amber-500 border-b border-gray-50 transition-colors">
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className="block w-full py-2.5 text-sm text-gray-700 font-medium hover:text-amber-500 border-b border-gray-50 transition-colors">
                {label}
              </a>
            )
          )}
          <Link to="/login" className="mt-3">
            <button className="cursor-pointer px-6 py-2 bg-amber-500 hover:bg-amber-600 transition-colors text-white text-sm font-medium rounded-xl">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile: icons if logged in, hamburger if not */}
{store ? (
  <div className="md:hidden flex items-center gap-6 -mr-10 ">
    
    {/* Wishlist */}
    <Link to="/home/wishlist">
      <div className="relative cursor-pointer hover:scale-110 transition-transform p-1">
        <Heart size={18} className="text-gray-600 hover:text-amber-500 transition-colors" />
        <Badge count={!wishList ? <Loading color="border-white"/> : wishList?.length || 0} />
      </div>
    </Link>

    {/* Cart */}
    <Link to="/home/cart">
      <div className="relative cursor-pointer hover:scale-110 transition-transform p-1">
        <ShoppingCart size={18} className="text-gray-600 hover:text-amber-500 transition-colors" />
        <Badge count={!cartItems ? <Loading color="border-white"/> : cartItems?.length || 0} />
      </div>
    </Link>

    {/* Profile */}
    <button
      onClick={handleProfileClick}
      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 flex items-center justify-center transition-colors cursor-pointer"
    >
      <User2Icon size={16} className="text-gray-600 hover:text-amber-500" />
    </button>
    {dropDown && (
      <div className="z-100 absolute top-14 right-4">
        <ProfileDropDown />
      </div>
    )}

  </div>
) : (
  <button
    onClick={() => setToggle(!toggle)}
    aria-label="Menu"
    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
  >
    <svg width="20" height="14" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="21" height="1.5" rx=".75" fill="#426287" />
      <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
      <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
    </svg>
  </button>
)}
      </nav>
    </>
  );
};