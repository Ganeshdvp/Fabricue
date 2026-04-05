import { useQueryClient } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { Loading } from "./Loading";
import { Info } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../utils/addressSlice";
import usePayment from "../hooks/usePayment";
import useProfile from "../hooks/useProfile";
import type { CartItem, RootState, PaymentMethod, Address } from "../types";

interface OrderSummaryProps {
  readonly totalPrice: number | undefined;
  readonly store: CartItem[] | null;
}

interface OrderItem {
  productId: string,
  color: string,
  quantity: number,
  size: string
}

export const OrderSummary: FC<OrderSummaryProps> = ({ totalPrice, store }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((store: RootState) => store?.user);

  const location = useLocation();
  const storeFromBuyNow = location.state?.items as OrderItem | undefined;
  const totalPriceFromBuyNow = location.state?.totalPrice as number;

  const addressStore = useSelector((store: RootState) => store?.address);
  const [showAddress, setShowAddress] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");

  const price: number = totalPriceFromBuyNow ?? totalPrice;
  const totalAmount: number = price + (price * 2) / 100;

  // fetch profile of addresses
  const { data } = useProfile();

  // payment
  const {
    mutate: orderMutate,
    isPending: orderPending,
    isError,
    error,
  } = usePayment();

  // place order button
  const handlePlaceOrder = (): void => {
    const itemsModify =
      storeFromBuyNow ??
      store?.map((item: CartItem) => ({
        productId: item.productId._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }));

    orderMutate({
      items: itemsModify,
      cancelUrl: window.location.href,
      paymentMethod: paymentMethod,
      deliveryAddress: addressStore,
    }, {
      onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order", userStore?._id] });
      if (data?.url) {
        window.location.href = data?.url;
      } else {
        navigate("/success");
      }
    },
    onError: (error) => {
      console.error("Payment error:", error.message);
    },
    });
  };

  return (
    <>
      <div className="w-full max-w-90 mx-auto mt-12">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Top strip */}
          <div className="h-1 w-full bg-linear-to-r from-amber-500 via-amber-400 to-amber-300" />

          <div className="p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            {/* Delivery Address */}
            <div className="mb-4">
              <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest mb-2">
                Delivery Address
              </p>
              {!addressStore ? (
                <>
                  <p className="text-xs font-medium text-gray-700">
                    No address found
                  </p>
                  <p className="text-[11px] flex items-center gap-1 mt-2 text-gray-500">
                    <Info size={12} /> Want to add a new address? Go to profile
                  </p>
                </>
              ) : (
                <div className="relative">
                  <div className="bg-amber-50 rounded-xl p-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          {data?.userId?.fullName}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                          {addressStore?.landMark}
                          <br />
                          {addressStore?.city} {addressStore?.pinCode}
                          <br />
                          {addressStore?.state}, {addressStore?.country}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="text-[11px] text-amber-500 hover:underline font-medium cursor-pointer whitespace-nowrap"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Address Dropdown */}
                  {showAddress && (
                    <div className="absolute top-full mt-1 left-0 right-0 z-50 bg-white border border-orange-100 rounded-xl shadow-lg shadow-orange-50 overflow-hidden">
                      {data?.address?.map((address: Address) => (
                        <div
                          key={address._id}
                          onClick={() => {
                            dispatch(addAddress(address));
                            setShowAddress(false);
                          }}
                          className="p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors last:border-0"
                        >
                          <p className="text-xs font-medium text-gray-800">
                            {data?.userId?.fullName}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                            {address.landMark}
                            <br />
                            {address.city}, {address.pinCode}
                            <br />
                            {address.state}, {address.country}
                          </p>
                        </div>
                      ))}
                      <p className="text-[11px] flex items-center gap-1 p-3 text-gray-400">
                        <Info size={12} /> Want to add a new address? Go to
                        profile
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest mb-2">
                Payment Method
              </p>
              <select
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full bg-amber-50 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none cursor-pointer"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            {/* Divider */}
            <div className="border-t border-orange-50 my-4" />

            {/* Price Breakdown */}
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Price</span>
                <span className="font-medium text-gray-700">&#8377;{price}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax (2%)</span>
                <span className="font-medium text-gray-700">
                  &#8377;{((price * 2) / 100).toFixed(2)}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center bg-orange-50 border border-orange-100 rounded-xl px-3 py-3 mt-2">
                <span className="text-sm font-semibold text-gray-800">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-amber-500">
                  &#8377;{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-4 py-3 bg-amber-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors cursor-pointer text-sm tracking-wide"
            >
              {orderPending ? <Loading color={'border-white'}/> : "Place Order"}
            </button>

            {isError && (
              <p className="text-red-500 text-[12px] mt-1 text-center">
                {error?.response?.data?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
