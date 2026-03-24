import { Edit2Icon, HeartIcon, LogOut, ShoppingBag, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import {removeUser} from '../utils/userSlice';
import {removeFavorite} from '../utils/wishListSlice';
import {removeCart} from '../utils/cartItemsSlice';
import { Link, useNavigate } from "react-router";
import { Loading } from "./Loading";
import {removeProduct} from '../utils/productSlice';
import {removeAddress} from '../utils/addressSlice';
import useLogout from "../hooks/useLogout";
import type { FC } from "react";



export const ProfileDropDown: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const {mutate, isPending, isError, error} = useLogout();

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
  return (
    <>
     <div className="z-100 text-sm w-44 p-3 bg-white border border-gray-500/30 text-gray-800/80 rounded-md font-medium shadow-2xl">
            <ul className="flex flex-col gap-px">
                <Link to='/home/profile' className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                    Profile
                    <Edit2Icon size={18}/>
                </Link>
                <Link to='/home/wishlist' className="flex items-center justify-between gap-3 hover:bg-gray-500/20 cursor-pointer px-3 py-2 rounded transition">
                    Wishlist
                    <HeartIcon size={18}/>
                </Link>
                <Link to='/home/cart' className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                    Cart Items
                    <ShoppingCart size={18}/>
                </Link>
                <Link to='/home/orders' className="flex items-center justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                    Orders
                    <ShoppingBag size={18}/>
                </Link>
                
                <div className="w-full h-px bg-gray-300/50 my-2"></div>
                <li onClick={handleLogout} className="flex items-center text-red-600/80 justify-between gap-3 cursor-pointer px-3 py-2 rounded hover:bg-red-600/20 transition">
                    <button disabled={isPending}>
                        {
                            isPending ? <Loading color="border-red-500"/> : "Logout"
                        }
                    </button>
                    <LogOut size={18}/>
                </li>
                {
                    isError && <p className="text-red-400 text-[12px] ml-4">{error?.response?.data?.message}</p>
                }
            </ul>
        </div>
    </>
  )
}
