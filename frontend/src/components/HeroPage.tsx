import { useState } from "react";
import { useNavigate } from "react-router";

export const HeroPage = () => {

  const [heroPageEmail, setHeroPageEmail] = useState("");
  const navigate = useNavigate();


  return (
    <>
      <section className='w-full bg-cover bg-center bg-no-repeat px-4 pb-10 -mt-20'>
        <div className="w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-20">
          {/* Left */}
          <div className="flex flex-col items-start">
            <a
              href="https://prebuiltui.com"
              className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full p-1 pr-3 text-sm mx-auto md:mx-0 mt-20"
            >
              <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full">
                NEW
              </span>
              <p className="flex items-center gap-2 text-amber-600">
                <span className="text-sm">Fresh Collections arrived!</span>
                <svg
                  className="mt-px"
                  width="6"
                  height="9"
                  viewBox="0 0 6 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m1 1 4 3.5L1 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </a>

            <h1 className="text-center lg:text-left text-neutral-900 text-4xl md:text-5xl lg:text-[52px]/16 leading-tight font-semibold max-w-[610px] mt-4">
              Discover Your Style. Redefine Your Confidence.
            </h1>
            <p className="text-center lg:text-left text-base/7 text-neutral-600 max-w-md mt-4 mx-auto md:mx-0">
              Explore premium fashion collections crafted for comfort, elegance,
              and everyday confidence. From timeless classics to trending styles
              — everything you need in one place.
            </p>

            <div className="flex items-center border gap-2 border-neutral-300 h-13 max-w-[440px] w-full rounded-full overflow-hidden mt-6 mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-full pl-6 outline-none text-sm bg-transparent text-neutral-600"
                required
              />
              <button
                type="submit"
                onClick={()=> {setHeroPageEmail(heroPageEmail); navigate('/login', {state: heroPageEmail})}}
                className="bg-amber-600 hover:bg-amber-700 w-56 h-10 rounded-full text-sm text-slate-50 cursor-pointer mr-1.5"
              >
                Shop Now
              </button>
            </div>

            {/* Avatars + Stars */}
            <div className="flex items-center mt-10 mx-auto lg:mx-0">
              <div className="flex -space-x-3 pr-3">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                  alt="user3"
                  className="size-9 object-cover rounded-full border border-slate-50 hover:-translate-y-0.5 transition"
                />
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                  alt="user1"
                  className="size-9 object-cover rounded-full border border-slate-50 hover:-translate-y-0.5 transition"
                />
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                  alt="user2"
                  className="size-9 object-cover rounded-full border border-slate-50 hover:-translate-y-0.5 transition"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                  alt="user3"
                  className="size-9 object-cover rounded-full border border-slate-50 hover:-translate-y-0.5 transition"
                />
              </div>

              <div>
                <div className="flex ">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star text-transparent fill-[#FF8F20]"
                        aria-hidden="true"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                      </svg>
                    ))}
                </div>
                <p className="text-xs text-neutral-600">
                  Used by 10,000+ customers
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="w-full max-w-md md:max-w-lg">
            <img
              className="w-full h-auto object-contain mix-blend-multiply"
              src={
                "https://png.pngtree.com/png-clipart/20240314/original/pngtree-clothes-with-clipping-path-isolated-png-image_14583646.png"
              }
              alt="Cloth Images"
            />
          </div>
        </div>
      </section>
    </>
  );
};
