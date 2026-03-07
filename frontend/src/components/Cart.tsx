import { useState } from "react"
import { Footer } from "./Footer"
import { NavBar } from "./NavBar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { BASE_URL } from '../utils/constants.js';
import { useDispatch } from "react-redux";
import { addCart } from '../utils/cartItemsSlice.js';
import { PageNotFound } from "./errorAndLoading/PageNotFound.js"
import { useNavigate } from "react-router"


export const Cart = () => {

    
    const queryClient = useQueryClient();


   const [showAddress, setShowAddress] = useState(false);
   const [count, setCount] = useState(1);
   const dispatch = useDispatch();
   const navigate = useNavigate();


   // fetching all cart items
   const {data, isPending} = useQuery({
    queryKey: ['cart'],
    queryFn: async()=>{
        const res = await axios.get(BASE_URL + '/cart', {
            withCredentials: true
        });
        dispatch(addCart(res?.data?.data));
        return res?.data?.data;
    }
   });

   // delete cart item
   const {mutate} = useMutation({
    mutationFn: async(id)=>{
        const res = await axios.delete(BASE_URL + `/cart/remove/${id}`, {
            withCredentials: true
        });
        return res?.data;
    },
    onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey: ['cart']});
    }
   });

   const handleRemoveItem = (id)=>{
    mutate(id);
   }

  return (
    <>
    <NavBar/>
     {
        data?.length > 0 ? (
            <div className="flex flex-col md:flex-row py-16 max-w-7xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">3 Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Size</p>
                    <p className="text-center">Color</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {data?.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product?.productId?.image[0]} alt={product?.productId?.name} />
                            </div>
                            <div>
                                <p className="font-semibold">{product?.productId?.name}</p>
                                <div className="font-normal text-gray-500/70">
                                <p>{product?.productId?.description}</p>
                                    <div className='flex items-center'>
                                        <div className="flex items-center justify-center gap-2 mt-2 md:w-20 w-16 h-[25px] bg-amber-500/25 rounded select-none">
                                <button onClick={() => {
                                    if(count>1){
                                        setCount((prev) => Math.max(prev - 1, 0))
                                    }
                                }} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{product?.quantity}</span>
                                <button onClick={() => setCount((prev) => prev + 1)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{product?.productId?.sizes[0]}</p>
                        <p className="text-center">{product?.productId?.colors[0]}</p>
                        <p className="text-center">${product?.productId?.discountPrice * (product?.productId?.quantity || 2)}</p>
                        <button className="cursor-pointer mx-auto hover:scale-120" onClick={()=> handleRemoveItem(product?._id)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button onClick={()=> navigate('/home')} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">No address found</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                                    New York, USA
                                </p>
                                <p onClick={() => setShowAddress(false)} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>$20</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>$20</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>$20</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    Place Order
                </button>
            </div>
        </div>
        ) : <PageNotFound title='Cart Items'/>
     }
    <Footer/>
    </>
  )
}
