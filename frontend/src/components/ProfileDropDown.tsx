import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { HeartIcon, LogOut, ShoppingBag, ShoppingCart } from "lucide-react";
import { BASE_URL } from '../utils/constants.js';
import { useDispatch } from "react-redux";
import {removeUser} from '../utils/userSlice.js';
import { Link, useNavigate } from "react-router";
import { Loading } from "./Loading.js";



export const ProfileDropDown = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: async ()=>{
            const res = await axios.post(BASE_URL + '/user/logout', {}, {
                withCredentials: true
            });
            return res?.data
        },
        onSuccess: ()=>{
            dispatch(removeUser());
            navigate('/login');
        }
    })

    const handleLogout = ()=>{
        mutate();
    }
  return (
    <>
     <div className="z-100 text-sm w-44 p-3 bg-white border border-gray-500/30 text-gray-800/80 rounded-md font-medium shadow-2xl">
            <ul className="flex flex-col gap-px">
                <li className="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
                    <Link to='/' className="-mr-px">Profile</Link>
                    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.672 6.763 5.58 15.854l-.166 2.995 2.995-.166L17.5 9.59m-2.828-2.828 1.348-1.349a2 2 0 1 1 2.829 2.829L17.5 9.59m-2.828-2.828L17.5 9.591" stroke="#1F2937" strokeWidth=".96" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </li>
                <Link to='/home/wishlist' className="flex items-center justify-between gap-3 hover:bg-gray-500/20 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
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
                            isPending ? <Loading/> : "Logout"
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
