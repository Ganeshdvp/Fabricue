import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { OrdersShimmer } from "./errorAndLoading/OrdersShimmer.js";


export const Orders = () => {
  // fetch orders
  const { data, isPending } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/orders", {
        withCredentials: true,
      });
      return res?.data?.data;
    },
    retryOnMount: true,
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  if(isPending){
    return (
      <div className="max-w-6xl mx-auto md:p-10 p-4 space-y-5"> <h2 className="text-2xl font-semibold text-gray-800 mb-6"> Orders List </h2> {Array(5) .fill(0) .map((_, index) => ( <OrdersShimmer key={index} /> ))} </div>
    )
  }

  return (
    <>
      <div className="max-w-6xl mx-auto md:p-10 p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Orders List
        </h2>

        <div className="space-y-5">
          {data?.map((order) =>
            order?.items?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:grid md:grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr] gap-5 items-center border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={item?.productId?.image?.[0]}
                  alt={item?.productId?.name}
                  className="w-16 h-16 object-cover rounded-md"
                />

                {/* Product Info */}
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">
                    {item?.productId?.name}
                  </p>

                  <div className="text-sm text-gray-500 flex gap-4 mt-1">
                    <p>Size: {item?.size}</p>
                    <p>Qty: {item?.quantity}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="text-sm text-gray-600 text-center md:text-left">
                  <p>Ganesh</p>
                  <p>Puttapaka</p>
                  <p>Yadadri Bhuvanagiri</p>
                  <p>Telangana 508253</p>
                </div>

                {/* Price */}
                <p className="font-semibold text-gray-800 ml-4">
                  $
                  {item?.productId?.discountPrice * item?.quantity +
                    (item?.productId?.discountPrice * item?.quantity * 2) / 100}
                </p>

                {/* Payment Method */}
                <p className="text-sm text-gray-600">{order.paymentMethod}</p>

                {/* Order Info */}
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-sm text-gray-500">
                    {new Date(order.paymentDate).toLocaleDateString()}
                  </p>
                </div>

                {/* status */}
                <div
                  className={`mt-1 px-3 py-1 text-xs rounded-full w-fit font-medium
                ${
                  order.status === "paid"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }`}
                >
                  {order.status === "paid" ? (
                    <p className="flex gap-x-1">
                      <CheckCircle2 size={16} />
                      paid
                    </p>
                  ) : (
                    <p className="flex gap-x-1">
                      <AlertCircle size={16} />
                      failed
                    </p>
                  )}
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
};
