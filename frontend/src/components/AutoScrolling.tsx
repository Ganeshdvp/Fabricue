import { useState, type FC } from "react";

interface Card {
  readonly title: string;
  readonly image: string;
}

const cardData: Card[] = [
  {
    title: "Mens Collections",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_400/v1775572581/confident-businessman-blazer-with-sunglasses-studio-corporate-fashion-clothes-pride-employee-eyewear-work-with-pose-professional-style-classy-outfit-by-white-background_590464-487371_cag6vg.avif",
  },
  {
    title: "Females Collections",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_400/v1775572583/brunette-woman-with-multi-colored-shopping-bags_329181-9193_tzifgy.avif",
  },
  {
    title: "Kids Collections",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_400/v1775572580/depositphotos_11409737-stock-photo-portrait-of-a-cute-african_htu8ay.webp",
  },
  {
    title: "All Types of Collections",
    image:
      "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_400/v1775572584/pngtree-happy-people-business-team-group-together-men-png-image_10069283_gjheen.png",
  },
];

export const AutoScrolling: FC = () => {
  const [stopScroll, setStopScroll] = useState<boolean>(false);

  return (
    <section
      id="top-collections"
      aria-labelledby="top-collections-heading"
      className="overflow-hidden w-full max-w-6xl mx-auto mt-36"
    >
      {/* Heading */}
      <h2
        id="top-collections-heading"
        className="font-semibold text-3xl text-center mb-4"
      >
        Top Collections
      </h2>

      {/* Description */}
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto mb-14">
        Discover our top collections featuring the latest trends, timeless
        essentials, and styles made to elevate your everyday look.
      </p>

      <div
        className="relative"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />

        {/* Scrolling track */}
        <ul
          className="flex w-fit"
          style={{
            animation: `marqueeScroll ${cardData.length * 2500}ms linear infinite`,
            animationPlayState: stopScroll ? "paused" : "running",
          }}
        >
          {[...cardData, ...cardData].map((card, index) => (
            <li key={index}>
              <article
                className="w-56 mx-4 h-80 relative group shrink-0 
                hover:scale-95 transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={card.image}
                  alt={`${card.title} fashion collection`}
                  loading="lazy"
                  decoding="async"
                  width="224"
                  height="320"
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center px-4 rounded-2xl 
                  bg-black/30 backdrop-blur-sm 
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-300"
                >
                  <p className="text-white text-lg font-semibold text-center">
                    {card.title}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
      </div>

      {/* Keyframes + Reduced Motion */}
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          ul {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};