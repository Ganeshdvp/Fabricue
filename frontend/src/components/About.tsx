import { type FC } from "react";

interface Feature {
  readonly icon: string;
  readonly alt: string;
  readonly title: string;
  readonly description: string;
}

const features: readonly Feature[] = [
  {
    icon: "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_64/v1774282216/badge_h3siv0.png",
    alt: "Premium quality badge icon",
    title: "Premium Quality Materials",
    description:
      "We source high-quality fabrics to ensure comfort, durability, and long-lasting style in every piece.",
  },
  {
    icon: "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_64/v1774282264/trending_ovcb5b.png",
    alt: "Trending fashion icon",
    title: "Trend-Driven Collections",
    description:
      "Stay ahead with fresh arrivals inspired by the latest global fashion trends.",
  },
  {
    icon: "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_64/v1774282217/diamond_lraiph.png",
    alt: "Luxury diamond icon",
    title: "Affordable Luxury",
    description:
      "Experience premium fashion at prices that don't break your budget.",
  },
  {
    icon: "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_64/v1774282252/shield_snj4yk.png",
    alt: "Secure payment shield icon",
    title: "Secure & Seamless Checkout",
    description:
      "Fast, safe, and encrypted payment process for a smooth shopping experience.",
  },
  {
    icon: "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_64/v1774282263/tracking_a16s10.png",
    alt: "Fast delivery tracking icon",
    title: "Fast & Reliable Delivery",
    description:
      "Quick dispatch and reliable shipping across India with real-time tracking.",
  },
  {
    icon: "https://res.cloudinary.com/dyakynych/image/upload/f_auto,q_auto,w_64/v1774282248/resend_ahyvl9.png",
    alt: "Easy returns support icon",
    title: "Easy Returns & Support",
    description:
      "Hassle-free returns and dedicated customer support to ensure complete satisfaction.",
  },
];

export const About: FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16"
    >
      {/* Heading */}
      <h2
        id="about-heading"
        className="text-3xl font-semibold text-center"
      >
        About Our Brand
      </h2>

      {/* Description */}
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Fabricue is a modern fashion brand delivering trend-forward styles with
        premium quality and everyday comfort.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        
        {/* Background blur */}
        <div
          aria-hidden="true"
          className="size-130 -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"
        />

        {features.map((feature) => (
          <article
            key={feature.title}
            className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 p-5 rounded-2xl transition-transform hover:scale-105"
          >
            {/* Icon */}
            <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
              <img
                src={feature.icon}
                alt={feature.alt}
                width="40"
                height="40"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content */}
            <div className="mt-5 space-y-2">
              <h3 className="text-base font-medium">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-200">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};