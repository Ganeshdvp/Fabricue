import { useState } from "react";

const cardData = [
  {
    title: "Mens Collections",
    image: "https://img.freepik.com/premium-photo/confident-businessman-blazer-with-sunglasses-studio-corporate-fashion-clothes-pride-employee-eyewear-work-with-pose-professional-style-classy-outfit-by-white-background_590464-487371.jpg?w=740&q=80",
  },
  {
    title: "Females Collections",
    image: "https://img.freepik.com/free-photo/brunette-woman-with-multi-colored-shopping-bags_329181-9193.jpg?w=740&q=80",
  },
  {
    title: "Kids Collections",
    image: "https://static9.depositphotos.com/1054749/1140/i/450/depositphotos_11409737-stock-photo-portrait-of-a-cute-african.jpg",
  },
  {
    title: "All Types of Collections",
    image: "https://png.pngtree.com/png-vector/20231004/ourmid/pngtree-happy-people-business-team-group-together-men-png-image_10069283.png",
  },
];

export const AutoScrolling = () => {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <section id="top-collections" className="overflow-hidden w-full max-w-6xl mx-auto mt-36">
      <h2 className="font-semibold text-3xl text-center mb-4">Top Collections</h2>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto mb-14">
        Discover our top collections featuring the latest trends, timeless essentials,
        and styles made to elevate your everyday look.
      </p>

      <div
        className="relative"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

        {/* Scrolling track */}
        <div
          className="flex w-fit"
          style={{
            animation: `marqueeScroll ${cardData.length * 2500}ms linear infinite`,
            animationPlayState: stopScroll ? "paused" : "running",
          }}
        >
          {[...cardData, ...cardData].map((card, index) => (
            <div
              key={index}
              className="w-56 mx-4 h-80 relative group hover:scale-90 transition-all duration-300 flex-shrink-0"
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4 rounded-2xl bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-lg font-semibold text-center">{card.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>

      {/* Keyframe — minimal, only what's needed */}
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
