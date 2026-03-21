import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants.js";
import { Loading } from "./Loading.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Card = ({ productData }) => {
  const {
    _id,
    name,
    brand,
    price,
    discountPrice,
    rating,
    description,
    image,
    isFavorite
  } = productData;
  const navigate = useNavigate();
  const store = useSelector(store=> store?.user);
  const wishList = useSelector(store => store?.wishList);
  const [favorite, setFavorite] = useState(
  wishList?.some(item => item._id === _id) ?? isFavorite
);

  const queryClient = useQueryClient();

  // add to cart
  const { mutate: cartMutate, isPending: cartPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        BASE_URL + `/cart/add/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", store?._id] });
      toast.success("Successfully added to cart", {
        style: {
          background: "#fb923c",
          color: "#ffffff",
          border: "1px solid #fb923c",
          borderRadius: "10px",
          fontSize: "12px",
          width: "250px",
          height: "40px",
        },
      });
    },
  });

  // add or remove favorite items
  const { mutate: favoriteMutate, isPending: favoritePending } = useMutation({
    mutationFn: async (type) => {
      const res = await axios.post(
        BASE_URL + `/favorite/${type}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", store?._id] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
       setFavorite(prev => !prev);
    },
  });

  // handle item to cart
  const handleCart = () => {
    cartMutate();
  };

  // handle favorite items
  const handleFavorite = (type) => {
    favoriteMutate(type);
  };

  return (
    <div className="group relative rounded-2xl pb-1 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full min-w-30 max-w-48 sm:min-w-52 sm:max-w-60 overflow-hidden flex flex-col">
      {/* Favorite button */}
      <button
        onClick={() => handleFavorite(favorite ? "remove" : "add")}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
      >
        {favoritePending ? (
          <Loading />
        ) : (
          <Heart
            size={13}
            className={favorite  ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        )}
      </button>

      {/* Image */}
      <div className="flex items-center justify-center px-4 pt-5 pb-3 bg-gray-50/60">
        <img
          className="h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          src={image[0]}
          alt={name}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 py-3 gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          {brand}
        </p>

        <p
          onClick={() => navigate(`/home/view/${_id}`)}
          className="text-gray-900 font-medium text-sm leading-snug truncate hover:text-amber-600 hover:underline cursor-pointer transition-colors"
        >
          {name}
        </p>

        <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
          {description.length > 80
            ? description.slice(0, 80) + "… more"
            : description}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) =>
              Math.floor(rating) > i ? (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                    fill="#f59e0b"
                  />
                </svg>
              ) : (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                    fill="#d1d5db"
                  />
                </svg>
              ),
            )}
          <p className="text-[11px] text-gray-400 ml-1">({rating})</p>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex gap-x-1 items-center">
            <p className="text-base font-semibold text-amber-500 leading-none">
              ${discountPrice}
            </p>
            <p className="text-[11px] text-gray-400 line-through mt-0.5">
              ${price}
            </p>
          </div>

          <button
            disabled={cartPending}
            onClick={handleCart}
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-600 text-xs font-medium px-3 h-8 rounded-xl transition-colors cursor-pointer disabled:opacity-60"
          >
            {cartPending ? (
              <Loading />
            ) : (
              <>
                <ShoppingCart size={13} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Higher-order Component with New-arrival label.
export const NewArrivalCard = (Card) => {
  return (props) => {
    return (
      <>
        <div className="relative">
          <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full">
            New
          </span>
          <Card {...props} />
        </div>
      </>
    );
  };
};
