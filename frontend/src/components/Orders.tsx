import { OrdersShimmer } from "./errorAndLoading/OrdersShimmer";
import { PageNotFound } from "./errorAndLoading/PageNotFound";
import useOrders from "../hooks/useOrders"


const statusConfig = {
  paid: {
    label: "Paid",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },
  COD: {
    label: "Cash on Delivery",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  failed: {
    label: "Failed",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-500",
  },
};
 


export const Orders = () => {
  
  // fetch orders
  const { data, isPending } = useOrders();

  if(isPending){
    return (
      <div className="max-w-6xl mx-auto md:p-10 p-4 space-y-5"> <h2 className="text-2xl font-semibold text-gray-800 mb-6"> Orders List </h2> {Array(5) .fill(0) .map((_, index) => ( <OrdersShimmer key={index} /> ))} </div>
    )
  }

  
  if (!data?.length) return <PageNotFound title="Orders" />;

  return (
    <>

    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
 
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-orange-100">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-amber-500 rounded-full" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {data.length} order{data.length !== 1 ? "s" : ""} placed
            </p>
          </div>
        </div>
      </div>
 
      {/* Orders List */}
      <div className="space-y-4">
        {data?.map((order) =>
          order?.items?.map((item, index) => {
            const status = statusConfig[order.status] || statusConfig.failed;
            const itemTotal =
              item?.productId?.discountPrice * item?.quantity +
              (item?.productId?.discountPrice * item?.quantity * 2) / 100;
 
            return (
              <div
                key={`${order._id}-${index}`}
                className="bg-white border rounded-xl shadow-sm overflow-hidden transition-all duration-200"
              >
                {/* Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-gray-200">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>
                      <span className="font-medium text-gray-600">Date: </span>
                      {new Date(order.paymentDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-orange-200 hidden sm:inline">|</span>
                    <span className="hidden sm:inline">
                      <span className="font-medium text-gray-600">Payment: </span>
                      {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online"}
                    </span>
                  </div>
 
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
 
                {/* Main Content */}
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
 
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item?.productId?.image?.[0]}
                        alt={item?.productId?.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-orange-100"
                      />
                    </div>
 
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base leading-tight">
                            {item?.productId?.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-50 text-gray-500 text-xs font-medium">
                              Size: {item?.size}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-50 text-gray-500 text-xs font-medium">
                              Qty: {item?.quantity}
                            </span>
                            {item?.color && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-gray-50 text-gray-500 text-xs font-medium">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-orange-200"
                                  style={{ backgroundColor: item.color.toLowerCase() }}
                                />
                                {item.color}
                              </span>
                            )}
                          </div>
                        </div>
 
                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-amber-500">
                            ${itemTotal.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">incl. 2% tax</p>
                        </div>
                      </div>
 
                      {/* Delivery Address */}
                      <div className="pt-4 border-t border-orange-50">
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-xs font-semibold text-gray-700">
                              {order?.userId?.fullName}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {order?.deliveryAddress?.landMark},{" "}
                              {order?.deliveryAddress?.city},{" "}
                              {order?.deliveryAddress?.state} —{" "}
                              {order?.deliveryAddress?.pinCode},{" "}
                              {order?.deliveryAddress?.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
 
    </>
  );
};
