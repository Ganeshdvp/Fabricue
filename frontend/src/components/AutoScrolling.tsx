import { useState } from "react";


export const AutoScrolling = () => {

       const [stopScroll, setStopScroll] = useState(false);
    const cardData = [
        {
            title: "Mens Collections",
            image: "https://img.freepik.com/premium-photo/confident-businessman-blazer-with-sunglasses-studio-corporate-fashion-clothes-pride-employee-eyewear-work-with-pose-professional-style-classy-outfit-by-white-background_590464-487371.jpg?semt=ais_rp_progressive&w=740&q=80",
        },
        {
            title: "Females Collections",
            image: "https://img.freepik.com/free-photo/brunette-woman-with-multi-colored-shopping-bags_329181-9193.jpg?semt=ais_rp_progressive&w=740&q=80",
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

  return (
    <>
       <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div id="top-collections" className="overflow-hidden w-full relative max-w-6xl mx-auto mt-36" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                <h2 className="font-semibold text-3xl text-center mb-4">Top Collections</h2>
                <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto mb-14">Discover our top collections featuring the latest trends, timeless essentials, and styles made to elevate your everyday look.</p>
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
                <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
                    <div className="flex">
                        {[...cardData, ...cardData].map((card, index) => (
                            <div key={index} className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300">
                                <img src={card.image} alt="card" className="w-full h-full object-cover rounded-2xl" />
                                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                                    <p className="text-white text-lg font-semibold text-center">{card.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
    </>
  )
}
