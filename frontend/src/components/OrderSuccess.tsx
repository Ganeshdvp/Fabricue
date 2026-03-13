import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
      navigate("/home/orders");
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-white overflow-hidden">

      {/* Animated circle */}
      <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-amber-500 animate-pulse shadow-xl">

        {/* Checkmark */}
        <svg
          className="w-16 h-16 text-white animate-[popup_0.8s_ease-in]"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>

        {/* ripple effect */}
        <span className="absolute w-full h-full rounded-full border-4 border-amber-300 animate-ping"></span>
      </div>

      {/* Title */}
      <h1 className="mt-8 text-3xl font-bold text-gray-800 animate-[fadeIn_1s_ease]">
        Order Placed Successfully 🎉
      </h1>

      {/* Description */}
      <p className="mt-2 text-gray-500 animate-[fadeIn_1.5s_ease]">
        Thank you for shopping with us.
      </p>

      {/* Redirect Button */}
      <button
        disabled={timer}
        className="mt-6 px-6 py-3 bg-amber-500 text-white rounded-lg shadow-md hover:bg-amber-600 transition disabled:opacity-50"
      >
        {timer && "Redirecting to orders..."}
      </button>
    </div>
  );
};