import { TriangleAlert, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";

export const AlertBanner: FC = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    const enter = setTimeout(() => setFadeIn(true), 100);
    const fade = setTimeout(() => setFadeOut(true), 3500);
    const hide = setTimeout(() => setVisible(false), 4000);
    return () => {
      clearTimeout(enter);
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-40 sm:bottom-4 right-14 sm:right-4 z-100 max-w-sm sm:max-w-md transition-all duration-500 ${
        fadeOut
          ? "opacity-0 translate-y-4"
          : fadeIn
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4" // initial hidden state before fade-in
      }`}
    >
      <div className="bg-amber-500 border border-gray-200 rounded-sm shadow-lg shadow-amber-100 p-4 py-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 animate-bounce">
              <TriangleAlert size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-1">Notice</p>
              <p className="text-[14px] text-gray-100 leading-relaxed">
                This website is only for Educational purpose only. Data is
                stored but never misused. No card details are saved.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setFadeOut(true);
              setTimeout(() => setVisible(false), 500);
            }}
            className="p-0.5 rounded-full hover:bg-gray-100 text-gray-50 hover:text-gray-600 transition-colors cursor-pointer flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
