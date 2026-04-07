import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

const REDIRECT_DELAY = 3000;

export const OrderSuccess: FC = () => {
  const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsRedirecting(false);
      navigate("/home/orders");
    }, REDIRECT_DELAY);

    return ()=> clearTimeout(timeoutId)
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 overflow-hidden">

  {/* Animated circle */}
  <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-amber-500 animate-pulse shadow-xl">

    {/* Checkmark */}
    <svg
      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white animate-[popup_0.8s_ease-in]"
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

    {/* Ripple effect */}
    <span className="absolute w-full h-full rounded-full border-4 border-amber-300 animate-ping"></span>
  </div>

  {/* Title */}
  <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center animate-[fadeIn_1s_ease]">
    Order Placed Successfully 🎉
  </h1>

  {/* Description */}
  <p className="mt-2 text-sm sm:text-base text-gray-500 text-center animate-[fadeIn_1.5s_ease]">
    Thank you for shopping with us.
  </p>

  {/* Redirect Button */}
  <button
    disabled={isRedirecting}
    className="mt-6 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-amber-500 text-white rounded-lg shadow-md hover:bg-amber-600 transition disabled:opacity-50 w-full max-w-xs sm:w-auto"
  >
    {"Redirecting to orders..."}
  </button>

</div>
  );
};