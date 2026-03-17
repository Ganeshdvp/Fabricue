import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { Loading } from "./Loading.js";
import { Info } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {addAddress} from '../utils/addressSlice.js';


export const OrderSummary = ({ totalPrice, store }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const storeFromBuyNow = location.state?.items;
  const totalPriceFromBuyNow = location.state?.totalPrice;

  const addressStore = useSelector(store=> store?.address);
  const [showAddress, setShowAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const price = totalPriceFromBuyNow || totalPrice;
  const totalAmount = price + (price * 2) / 100;

  // fetch profile of addresses
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addAddress(res?.data?.data[0]?.address[0]));
      return res?.data?.data[0];
    },
    retryOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // payment
  const { mutate: orderMutate, isPending: orderPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + `/payment`, data, {
        withCredentials: true,
      });
      return res?.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      if(data?.url) {
        window.location.href = data?.url;
      }
      else{
        navigate('/success');
      }
    },
    onError: (error) => {
      console.error("Payment error:", error.message);
    },
  });

  // place order button
  const handlePlaceOrder = () => {
    const itemsModify = storeFromBuyNow ||  store.map((item) => ({
      productId: item.productId._id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    }));
    const data = {
      items: itemsModify,
      cancelUrl: window.location.href,
      paymentMethod: paymentMethod,
      deliveryAddress: addressStore
    };
    orderMutate(data);
  };

  return (
    <>
      <div className="max-w-[360px] mx-auto mt-4 w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          {
            !addressStore ? <Loading/> : (
                <div className="relative flex justify-between items-start mt-2">
            <pre className="text-gray-500 text-[13px]">
              {data?.userId?.fullName}
              <br />
              {addressStore?.landMark} <br />
              {addressStore?.city} {addressStore?.pinCode} <br />
              {addressStore?.state}, {addressStore?.country}
            </pre>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[13px] text-amber-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <>
                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full shadow-lg">
                  {data?.address?.map((address) => (
                    <>
                      <pre
                        key={address._id}
                        onClick={()=> {dispatch(addAddress(address)); setShowAddress(false)}}
                        className="text-gray-500 text-[13px] border-b pb-2 p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {data?.userId?.fullName}
                        <br />
                        {address.landMark} <br />
                        {address.city}, {address.pinCode} <br />
                        {address.state}, {address.country}
                      </pre>
                    </>
                  ))}
                  <p className="text-[12px] flex items-center gap-x-1 p-2"><Info size={14}/> Want to add new address? Go to profile</p>
                </div>
              </>
            )}
          </div>
            )
          }

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${totalPriceFromBuyNow || totalPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${((totalPriceFromBuyNow || totalPrice) * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${totalAmount}</span>
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-amber-500 text-white font-medium hover:bg-amber-600 transition"
        >
          {orderPending ? <Loading /> : "Place Order"}
        </button>
      </div>
    </>
  );
};
