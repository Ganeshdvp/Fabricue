import React from "react";

interface Feature {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "../../public/badge.png",
    alt: "badge-icon",
    title: "Premium Quality Materials",
    description:
      "We source high-quality fabrics to ensure comfort, durability, and long-lasting style in every piece.",
  },
  {
    icon: "../../public/trending.png",
    alt: "trending-icon",
    title: "Trend-Driven Collections",
    description:
      "Stay ahead with fresh arrivals inspired by the latest global fashion trends.",
  },
  {
    icon: "../../public/diamond.png",
    alt: "luxury-icon",
    title: "Affordable Luxury",
    description:
      "Experience premium fashion at prices that don't break your budget.",
  },
  {
    icon: "../../public/shield.png",
    alt: "secure-icon",
    title: "Secure & Seamless Checkout",
    description:
      "Fast, safe, and encrypted payment process for a smooth shopping experience.",
  },
  {
    icon: "../../public/tracking.png",
    alt: "fast-icon",
    title: "Fast & Reliable Delivery",
    description:
      "Quick dispatch and reliable shipping across India with real-time tracking.",
  },
  {
    icon: "../../public/resend.png",
    alt: "return-icon",
    title: "Easy Returns & Support",
    description:
      "Hassle-free returns and dedicated customer support to ensure complete satisfaction.",
  },
];

export const About: React.FC = () => {
  return (
    <>
    
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <h1 id="about" className="text-3xl font-semibold text-center mx-auto mt-12">
        About our apps
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Fabricue is a modern fashion brand delivering trend-forward styles with
        premium quality and everyday comfort.
      </p>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8 lg:px-12 md:px-10 pt-16">
        <div className="size-130 -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]" />

        {features.map((feature: Feature) => (
          <div
            key={feature.title}
            className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 w-fit p-4 rounded-2xl hover:scale-102"
          >
            <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
              <img src={feature.icon} alt={feature.alt} />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-base font-medium">{feature.title}</h3>
              <p className="text-sm text-slate-200">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
