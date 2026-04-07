import { useState, type FC } from "react";
import { useNavigate } from "react-router";
import { emailRegex } from "../utils/constants";

export const HeroPage: FC = () => {
  const [heroPageEmail, setHeroPageEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (): void => {
    if (emailRegex.test(heroPageEmail)) {
      setError(null);
      navigate("/login", { state: { heroPageEmail } });
    } else {
      setError("Invalid Email Format!");
    }
  };

  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat px-4 pb-10 -mt-20"
      aria-labelledby="hero-heading"
    >
      <div className="w-full md:px-16 lg:px-24 xl:px-32 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-20">
        
        {/* Left */}
        <div className="flex flex-col items-start">

          {/* New badge */}
          <button
            type="button"
            aria-label="View new fashion collections"
            className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full p-1 pr-3 text-sm mx-auto md:mx-0 mt-20"
          >
            <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full">
              NEW
            </span>
            <span className="flex items-center gap-2 text-amber-600">
              <span className="text-sm">Fresh Collections arrived!</span>
              <svg
                className="mt-px"
                width="6"
                height="9"
                viewBox="0 0 6 9"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m1 1 4 3.5L1 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-center lg:text-left text-neutral-900 text-4xl md:text-5xl lg:text-[52px]/16 leading-tight font-semibold max-w-152.5 mt-4"
          >
            Discover Your Style. Redefine Your Confidence.
          </h1>

          {/* Description */}
          <p className="text-center lg:text-left text-base/7 text-neutral-600 max-w-md mt-4 mx-auto md:mx-0">
            Explore premium fashion collections crafted for comfort, elegance,
            and everyday confidence. From timeless classics to trending styles —
            everything you need in one place.
          </p>

          {/* Form */}
          <div className="flex flex-col items-start max-w-110 w-full mx-auto md:mx-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex items-center border gap-2 border-neutral-300 h-13 rounded-full overflow-hidden mt-6 w-full"
            >
              <label htmlFor="email" className="sr-only">
                Enter your email
              </label>

              <input
                id="email"
                type="email"
                value={heroPageEmail}
                onChange={(e) => setHeroPageEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-full pl-6 outline-none text-sm bg-transparent text-neutral-600"
                required
              />

              <button
                type="submit"
                aria-label="Submit email and shop now"
                className="bg-amber-600 hover:bg-amber-700 w-56 h-10 rounded-full text-sm text-slate-50 cursor-pointer mr-1.5"
              >
                Shop Now
              </button>
            </form>

            {/* Error */}
            {error && (
              <p
                className="text-red-500 text-[12px] ml-6 mt-1"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}
          </div>

          {/* Avatars + Rating */}
          <div className="flex items-center mt-10 mx-auto lg:mx-0">
            <div className="flex -space-x-3 pr-3">
              <img
                src="https://res.cloudinary.com/dyakynych/image/upload/q_auto/f_auto/v1775571210/photo-1438761681033-6461ffad8d80_pyubps.jpg"
                alt=""
                aria-hidden="true"
                className="size-9 object-cover rounded-full border border-slate-50"
              />
              <img
                src="https://res.cloudinary.com/dyakynych/image/upload/q_auto/f_auto/v1775571211/photo-1633332755192-727a05c4013d_pkitqg.jpg"
                alt=""
                aria-hidden="true"
                className="size-9 object-cover rounded-full border border-slate-50"
              />
              <img
                src="https://res.cloudinary.com/dyakynych/image/upload/q_auto/f_auto/v1775571211/photo-1535713875002-d1d0cf377fde_oetrz8.jpg"
                alt=""
                aria-hidden="true"
                className="size-9 object-cover rounded-full border border-slate-50"
              />
            </div>

            <div>
              <div className="flex" aria-hidden="true">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="fill-[#FF8F20]"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                  ))}
              </div>
              <p className="text-xs text-neutral-600">
                Used by 10,000+ customers
              </p>
            </div>
          </div>
        </div>

        {/* Right (Hero Image) */}
        <div className="w-full max-w-md md:max-w-lg">
          <img
            className="w-full h-auto object-contain mix-blend-multiply"
            src="https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_500/v1775570969/pngtree-clothes-with-clipping-path-isolated-png-image_14583646_vieki3.png"
            alt="Trendy fashion clothing collection for men and women"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="500"
            height="500"
          />
        </div>
      </div>
    </section>
  );
};