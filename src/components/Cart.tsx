import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../utils/cartItemsSlice.js";
import { PageNotFound } from "./errorAndLoading/PageNotFound.js";
import { Link, useNavigate } from "react-router";
import { OrderSummary } from "./OrderSummary.js";
import { CartShimmer } from "./errorAndLoading/CartShimmer.js";

export const Cart = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((store) => store?.cartItems);

  // fetching all cart items
  const { data, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + "/cart", {
        withCredentials: true,
      });
      dispatch(addCart(res?.data?.data));
      return res?.data?.data;
    },
  });

  // increase quantity
  const { mutate: quantityMutate } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + `/cart/quantity`, data, {
        withCredentials: true,
      });
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // delete cart item
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(BASE_URL + `/cart/remove/${id}`, {
        withCredentials: true,
      });
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const totalPrice = data?.reduce((acc, item) => {
    return acc + item?.productId?.discountPrice * item?.quantity;
  }, 0);

  // remove item
  const handleRemoveItem = (id) => {
    mutate(id);
  };

  const increase = (id) => {
    const data = {
      id: id,
      type: "inc",
    };
    quantityMutate(data);
  };

  const decrease = (id, currentQty) => {
    if (currentQty > 1) {
      const data = {
        id: id,
        type: "dec",
      };
      quantityMutate(data);
    }
  };

  if (isPending) {
    return (
      <>
        <CartShimmer />
      </>
    );
  }

  return data?.length > 0 ? (
    <div className="min-h-screen px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
 
        {/* Cart Items */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-6">
            Shopping Cart{" "}
            <span className="text-base text-orange-500 font-normal">
              {store.length} item{store.length !== 1 ? "s" : ""}
            </span>
          </h1>
 
          {/* Table Header - hidden on mobile */}
          <div className="hidden md:grid grid-cols-[3fr_0.7fr_0.7fr_0.7fr_0.5fr] px-3 pb-3 text-xs font-semibold text-gray-400 uppercase tracking-widest border-b border-orange-100">
            <span>Product</span>
            <span className="text-center">Size</span>
            <span className="text-center">Color</span>
            <span className="text-center">Total</span>
            <span />
          </div>
 
          {/* Cart Items */}
          <div className="space-y-3 mt-3">
            {data?.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 p-4"
              >
                {/* Mobile layout */}
                <div className="flex gap-4 md:hidden">
                  <div className="w-20 h-20 rounded-xl border border-orange-100 overflow-hidden flex-shrink-0 bg-orange-50">
                    <img
                      src={product?.productId?.image[0]}
                      alt={product?.productId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/home/view/${product?.productId._id}`}>
                      <p className="font-semibold text-gray-900 text-sm hover:text-orange-500 transition-colors truncate">
                        {product?.productId?.name}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Size: {product?.size} &nbsp;·&nbsp; Color: {product?.color}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-0 bg-orange-50 border border-orange-100 rounded-lg overflow-hidden h-7">
                        <button
                          onClick={() => decrease(product?._id, product?.quantity)}
                          className="px-2.5 h-full text-amber-500 hover:bg-orange-100 transition-colors font-medium"
                        >−</button>
                        <span className="text-xs font-medium text-gray-700 min-w-[20px] text-center">{product?.quantity}</span>
                        <button
                          onClick={() => increase(product?._id)}
                          className="px-2.5 h-full text-amber-500 hover:bg-orange-100 transition-colors font-medium"
                        >+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold text-amber-500">
                          ${product?.productId?.discountPrice * product?.quantity}
                        </p>
                        <button onClick={() => handleRemoveItem(product?._id)} className="cursor-pointer hover:scale-120">
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
 
                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-[3fr_0.7fr_0.7fr_0.7fr_0.5fr] items-center gap-2">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl border border-orange-100 overflow-hidden flex-shrink-0 bg-orange-50">
                      <img
                        src={product?.productId?.image[0]}
                        alt={product?.productId?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link to={`/home/view/${product?.productId._id}`}>
                        <p className="font-semibold text-gray-900 text-sm hover:text-orange-500 transition-colors">
                          {product?.productId?.name}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-400 mt-1">
                        {product?.productId?.description.length > 40
                          ? product?.productId?.description.slice(0, 40) + "..."
                          : product?.productId?.description}
                      </p>
                      <div className="flex items-center gap-0 bg-orange-50 border border-orange-100 rounded-lg overflow-hidden h-7 w-fit mt-2">
                        <button
                          onClick={() => decrease(product?._id, product?.quantity)}
                          className="px-2.5 h-full text-amber-500 hover:bg-orange-100 transition-colors font-medium text-sm"
                        >−</button>
                        <span className="text-xs font-medium text-gray-700 min-w-[20px] text-center">{product?.quantity}</span>
                        <button
                          onClick={() => increase(product?._id)}
                          className="px-2.5 h-full text-amber-500 hover:bg-orange-100 transition-colors font-medium text-sm"
                        >+</button>
                      </div>
                    </div>
                  </div>
 
                  <p className="text-center text-sm text-gray-500">{product?.size}</p>
 
                  <div className="flex justify-center">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-orange-100"
                      style={{ backgroundColor: product?.color?.toLowerCase() }}
                      title={product?.color}
                    />
                  </div>
 
                  <p className="text-center text-sm font-bold text-amber-500">
                    ${product?.productId?.discountPrice * product?.quantity}
                  </p>
 
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRemoveItem(product?._id)}
                      className="hover:scale-110 transition-transform cursor-pointer"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
 
          {/* Continue Shopping */}
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 mt-8 text-amber-500 text-sm font-medium hover:gap-3 transition-all cursor-pointer"
          >
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="orange" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Continue Shopping
          </button>
        </div>
 
        {/* Order Summary */}
        <div className="lg:w-[360px] w-full">
          <OrderSummary totalPrice={totalPrice} store={store} />
        </div>
 
      </div>
    </div>
  ) : (
    <PageNotFound title="Cart Items" />
  );
};
