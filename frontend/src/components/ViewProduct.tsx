import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL } from "../utils/constants.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "./Loading.js";
import { ViewProductShimmer } from "./errorAndLoading/ViewProductShimmer.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export const ViewProduct = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const [size, setSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  const store = useSelector(store=> store?.user);

  // fetch product
  const { data, isPending } = useQuery({
    queryKey: [`product/${id}`],
    queryFn: async () => {
      const res = await axios.get(BASE_URL + `/product/${id}`, {
        withCredentials: true,
      });
      return res?.data?.data;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // add to cart
  const { mutate: cartMutate, isPending: cartPending } = useMutation({
    mutationFn: async (cartData) => {
      const res = await axios.post(BASE_URL + `/cart/add/${id}`, cartData, {
        withCredentials: true,
      });
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", store?._id] });
               toast.success("successfully added to cart", {
  style: {
    background: '#fb923c',      // orange-600
    color: '#ffffff',
    border: '1px solid #fb923c',
    borderRadius: '10px',
    fontSize: '12px',
    width: '250px',
    height: '40px',
  }
});
    },
  });
  

  if (isPending) return <ViewProductShimmer/>

  const handleBuyButton = () => {
    if (!size || !selectedColor){
      return setError('all fields are required!');
    };

    navigate('/home/payment', {
      state: {
        items: [
        {
        productId : data._id,
        size: size,
        color: selectedColor,
        quantity: quantity
      }
      ],
      totalPrice: data?.discountPrice * quantity
      }
    })
  };

  const handleAddToCart = () => {
    const cartData = { 
      size: size || data?.sizes[0],
      selectedColor: selectedColor || data?.colors[0],
      quantity : quantity
    };
    cartMutate(cartData);
    navigate("/home/cart");
  };

  const increase = () => {
    if(data?.stock > quantity){
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <>
      {data && (
  <div className="max-w-6xl w-full px-4 md:px-8 mx-auto mt-10 mb-16">
    <div className="flex flex-col lg:flex-row gap-10 mt-4">
 
      {/* LEFT — Images */}
      <div className="flex gap-3 flex-shrink-0">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2">
          {data?.image?.map((image, index) => (
            <div
              key={index}
              onClick={() => setImageIndex(index)}
              className={`w-14 h-14 rounded-xl overflow-hidden cursor-pointer border-2 transition-all
                ${imageIndex === index
                  ? "border-amber-400 shadow-md shadow-amber-100"
                  : "border-gray-100 hover:border-amber-200"
                }`}
            >
              <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
 
        {/* Main Image */}
        <div className="w-72 md:w-96 h-80 md:h-[420px] rounded-2xl bg-amber-50 border border-amber-100 overflow-hidden flex items-center justify-center">
          <img
            src={data?.image[imageIndex]}
            alt={data?.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain scale-90 hover:scale-95 transition-transform duration-300"
          />
        </div>
      </div>
 
      {/* RIGHT — Details */}
      <div className="flex-1 min-w-0">
 
        {/* Brand + Stock Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest">{data?.brand || "Fabricue"}</span>
          {data.stock === 0 ? (
            <span className="text-[10px] font-semibold bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full">Out of Stock</span>
          ) : data.stock < 20 ? (
            <span className="text-[10px] font-semibold bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full">Only {data.stock} left!</span>
          ) : (
            <span className="text-[10px] font-semibold bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full">In Stock</span>
          )}
        </div>
 
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data.name}</h1>
        <p className="text-sm text-gray-400 mb-3">Men's casual shirt for daily wear and occasions</p>
 
        {/* Stars + Reviews */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-0.5">
            {Array(5).fill("").map((_, i) =>
              Math.floor(data.rating) > i ? (
                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none">
                  <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" fill="#f59e0b"/>
                </svg>
              ) : (
                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="none">
                  <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" fill="#e5e7eb"/>
                </svg>
              )
            )}
          </div>
          <span className="text-sm text-gray-500">{data.rating} · {data?.numReviews} reviews</span>
        </div>
 
        {/* Price Box */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 mb-6 flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl font-bold text-amber-500">
            ${data.discountPrice * quantity || data.discountPrice}
          </span>
          <span className="text-sm text-gray-300 line-through">
            ${data.price * quantity || data.price}
          </span>
          {data.price > data.discountPrice && (
            <span className="text-[11px] font-semibold bg-amber-500 text-white px-2 py-0.5 rounded-full">
              {Math.round(((data.price - data.discountPrice) / data.price) * 100)}% off
            </span>
          )}
          <span className="text-xs text-gray-400 ml-auto">incl. all taxes</span>
        </div>
 
        {/* Quantity */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Quantity</p>
          <div className="inline-flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={decrease} className="w-10 h-10 flex items-center justify-center text-amber-500 hover:bg-amber-50 transition text-lg font-medium cursor-pointer">−</button>
            <span className="w-10 text-center text-sm font-semibold text-gray-800">{quantity}</span>
            <button onClick={increase} className="w-10 h-10 flex items-center justify-center text-amber-500 hover:bg-amber-50 transition text-lg font-medium cursor-pointer">+</button>
          </div>
        </div>
 
        {/* Colors */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Color — <span className="font-normal text-gray-400 normal-case">{selectedColor || "Select"}</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {data?.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={`w-9 h-9 rounded-lg border-2 transition-all cursor-pointer
                  ${selectedColor === color
                    ? "border-amber-500 scale-110 shadow-md shadow-amber-100"
                    : "border-gray-200 hover:border-amber-300"
                  }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </div>
 
        {/* Sizes */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Size</p>
          <div className="flex gap-2 flex-wrap">
            {data?.sizes.map((s, index) => (
              <button
                key={index}
                onClick={() => setSize(s)}
                className={`w-11 h-11 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer
                  ${size === s
                    ? "border-amber-500 bg-amber-50 text-amber-700 scale-105"
                    : "border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-600"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
 
        {/* About */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">About this product</p>
          <p className="text-sm text-gray-500 leading-relaxed">{data.description}</p>
        </div>
 
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={cartPending}
            className="flex-1 py-3.5 rounded-2xl border-2 border-amber-200 bg-amber-50 text-amber-700 font-semibold text-sm hover:bg-amber-100 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {cartPending ? <Loading /> : `Add to Cart`}
          </button>
          <button
            onClick={handleBuyButton}
            disabled={data?.stock === 0}
            className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition cursor-pointer disabled:opacity-50 disabled:bg-gray-300 flex items-center justify-center gap-2"
          >
            {data?.stock === 0 ? "Out of Stock" : "Buy Now"}
          </button>
        </div>
 
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  </div>
      )}
    </>
  );
};
