import {
  ChartNoAxesColumnDecreasing,
  ChevronsUp,
  ShieldCheck,
} from "lucide-react";
import type { FC } from "react";

export const Feature: FC = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative mt-36 px-4 max-w-6xl mx-auto"
    >
      {/* Background blur */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full blur-[200px] -z-10 bg-[#FBFFE1]/70" />

      {/* Heading */}
      <h2
        id="features-heading"
        className="text-2xl md:text-3xl font-semibold text-center"
      >
        What We Provide
      </h2>

      {/* Features list */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        
        {/* Item 1 */}
        <li>
          <article className="flex flex-col items-center text-center max-w-xs mx-auto">
            <div className="p-6 bg-amber-100 rounded-full">
              <ChartNoAxesColumnDecreasing
                aria-hidden="true"
                className="w-6 h-6"
              />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Premium Quality & Comfort
              </h3>
              <p className="text-sm text-slate-600">
                Crafted with high-grade fabrics and attention to detail, every
                piece delivers lasting comfort and durability.
              </p>
            </div>
          </article>
        </li>

        {/* Item 2 */}
        <li>
          <article className="flex flex-col items-center text-center max-w-xs mx-auto">
            <div className="p-6 bg-amber-100 rounded-full">
              <ChevronsUp aria-hidden="true" className="w-6 h-6" />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Fast Delivery & Easy Returns
              </h3>
              <p className="text-sm text-slate-600">
                Quick shipping and hassle-free returns ensure a smooth,
                worry-free shopping experience every time.
              </p>
            </div>
          </article>
        </li>

        {/* Item 3 */}
        <li>
          <article className="flex flex-col items-center text-center max-w-xs mx-auto">
            <div className="p-6 bg-amber-100 rounded-full">
              <ShieldCheck aria-hidden="true" className="w-6 h-6" />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-base font-semibold text-slate-700">
                Secure & Seamless Checkout
              </h3>
              <p className="text-sm text-slate-600">
                Shop confidently with encrypted payments and a fast,
                user-friendly checkout process.
              </p>
            </div>
          </article>
        </li>

      </ul>
    </section>
  );
};