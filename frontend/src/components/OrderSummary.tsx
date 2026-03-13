import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from '../utils/constants.js';
import axios from "axios";
import { Loading } from "./Loading.js";

export const OrderSummary = ({totalPrice, store}) => {

    const queryClient = useQueryClient();
    
  const [showAddress, setShowAddress] = useState(false);
  const totalAmount = totalPrice + (totalPrice * 2 / 100);

  // add to orders
   const { mutate: orderMutate, isPending: orderPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + `/payment`, data, {
        withCredentials: true,
      });
      console.log(res?.data)
      return res?.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      window.location.href = data?.url;
    },
    onError: (error) => {
      console.error("Payment error:", error.message);
    },
  });

  const handlePlaceOrder = ()=>{
    const itemsModify = store.map(item => ({
    productId: item.productId._id,
    size: item.size,
    color: item.color,
    quantity: item.quantity
  }));
    const data = {
      items: itemsModify,
      cancelUrl: window.location.href,
      paymentMethod: "Online",
      paymentDate: new Date(),
    };
    orderMutate(data);
  }

  return (
    <>
    <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <pre className="text-gray-500 text-[13px]">Ganesh,<br />
                            Puttapaka, Narayanapur road, <br />
                            Yadadri Bhuvanagiri district, 508253 <br />
                            Telangana state, India</pre>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-[13px] text-amber-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                                    New York, USA
                                </p>
                                <p onClick={() => setShowAddress(false)} className="text-amber-500 text-center cursor-pointer p-2 hover:bg-amber-500/10">
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
                        <span>Price</span><span>${totalPrice}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>${totalPrice * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>${totalAmount}</span>
                    </p>
                </div>

                <button onClick={handlePlaceOrder} className="w-full py-3 mt-6 cursor-pointer bg-amber-500 text-white font-medium hover:bg-amber-600 transition">
                    {orderPending ? <Loading/> : 'Place Order'}
                </button>
            </div>
    </>
  )
}
