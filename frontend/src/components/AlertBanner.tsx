import { TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
 
export const AlertBanner = () => {
 const [visible, setVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setFadeIn(true), 100);
    const fade = setTimeout(() => setFadeOut(true), 3500);
    const hide = setTimeout(() => setVisible(false), 4000);
    return () => { clearTimeout(enter); clearTimeout(fade); clearTimeout(hide); };
  }, []);

  if (!visible) return null;
 
  return (
   <div
      className={`fixed bottom-4 right-4 z-[100] max-w-xs transition-all duration-500 ${
        fadeOut
          ? "opacity-0 translate-y-4"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="bg-white border border-red-200 rounded-2xl shadow-lg shadow-red-100 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 animate-bounce">
              <TriangleAlert size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-md font-semibold text-red-500 mb-1">Notice</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                This website is only for Educational purpose only. Data is stored but never misused. No card details are saved.
              </p>
            </div>
          </div>
          <button
            onClick={() => { setFadeOut(true); setTimeout(() => setVisible(false), 500); }}
            className="p-0.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};