import type { FC } from "react";

interface Features {
  icon: string,
  alt: string,
  number: string,
  title: string,
  description: string
}

interface Stats {
  value: string,
  label: string
}

const features: Features[] = [
    {
      icon: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282216/badge_h3siv0.png",
      alt: "badge-icon",
      number: "01",
      title: "Premium Quality Materials",
      description:
        "We source high-quality fabrics to ensure comfort, durability, and long-lasting style in every single piece we craft.",
    },
    {
      icon: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282264/trending_ovcb5b.png",
      alt: "trending-icon",
      number: "02",
      title: "Trend-Driven Collections",
      description:
        "Stay ahead with fresh arrivals inspired by the latest global fashion trends, curated every season.",
    },
    {
      icon: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282217/diamond_lraiph.png",
      alt: "luxury-icon",
      number: "03",
      title: "Affordable Luxury",
      description:
        "Experience premium fashion at prices that don't break your budget — quality without compromise.",
    },
    {
      icon: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282252/shield_snj4yk.png",
      alt: "secure-icon",
      number: "04",
      title: "Secure & Seamless Checkout",
      description:
        "Fast, safe, and encrypted payment process for a smooth, worry-free shopping experience every time.",
    },
    {
      icon: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282263/tracking_a16s10.png",
      alt: "fast-icon",
      number: "05",
      title: "Fast & Reliable Delivery",
      description:
        "Quick dispatch and reliable shipping across India with real-time order tracking at your fingertips.",
    },
    {
      icon: "https://res.cloudinary.com/dyakynych/image/upload/w_300,q_auto,f_auto/v1774282248/resend_ahyvl9.png",
      alt: "return-icon",
      number: "06",
      title: "Easy Returns & Support",
      description:
        "Hassle-free returns and dedicated customer support to ensure your complete satisfaction, always.",
    },
  ];

  const stats: Stats[] = [
    { value: "50K+", label: "Happy Customers" },
    { value: "1200+", label: "Styles Available" },
    { value: "4.9★", label: "Average Rating" },
    { value: "24h", label: "Support Response" },
  ];

  const promises: string[] = [
    "Ethically Sourced",
    "Size Inclusive",
    "Pan-India Delivery",
    "7-Day Returns",
    "24/7 Support",
    "Secure Payments",
  ];

export const HomeAbout: FC = () => {

  return (
    <div id="about" className="bg-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative px-6 pt-28 pb-24 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#fffbeb,#ffffff)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-125 h-125 bg-amber-100 rounded-full blur-[120px] opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-75 h-75 bg-amber-50 rounded-full blur-[80px] opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-600">
                About Fabricue
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.06] tracking-tight mb-6">
              Where Style
              <br />
              Meets{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-amber-500">Quality</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-100 z-0 rounded" />
              </span>
            </h1>

            <p className="text-base text-gray-500 leading-relaxed max-w-md mb-10">
              Fabricue is a modern fashion destination built around one belief —
              that great style should be accessible, comfortable, and built to
              last. From everyday basics to statement pieces, we have you
              covered.
            </p>

            {/* Mini stat pills */}
            <div className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm hover:border-amber-300 hover:shadow-amber-50 hover:shadow-md transition-all"
                >
                  <span className="text-xl font-bold text-gray-900 tabular-nums">
                    {s.value}
                  </span>
                  <span className="text-xs text-gray-400 font-medium leading-tight max-w-15">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — decorative card stack */}
          <div className="hidden lg:flex items-center justify-center relative h-120">
            {/* Glow blob behind everything */}
            <div className="absolute w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

            {/* Back card — rotated */}
            <div className="absolute w-72 h-44 bg-linear-to-br from-amber-400 to-amber-500 rounded-3xl rotate-[-8deg] top-6 left-4 shadow-lg border border-amber-300">
              <div className="p-6">
                <div className="w-8 h-8 rounded-full bg-white/20 mb-3" />
                <div className="h-2.5 w-32 bg-white/30 rounded-full mb-2" />
                <div className="h-2 w-20 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Middle card — slightly rotated */}
            <div className="absolute w-64 h-36 bg-linear-to-br from-amber-50 to-white rounded-2xl rotate-[4deg] bottom-16 right-2 shadow-md border border-amber-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 3l-4 4-4-4"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Fast Delivery
                </div>
                <div className="text-[11px] text-gray-400 leading-relaxed">
                  Pan-India shipping with live tracking
                </div>
              </div>
            </div>

            {/* Main front card */}
            <div className="relative w-80 h-85 bg-white rounded-3xl border border-gray-200 shadow-2xl shadow-amber-100 p-7 flex flex-col justify-between z-10">
              {/* Top badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-600">
                    Trusted Brand
                  </span>
                </div>
                <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                </div>
              </div>

              {/* Illustration area */}
              <div className="flex-1 bg-linear-to-br from-amber-50 to-amber-100/50 rounded-2xl flex flex-col items-center justify-center gap-3 border border-amber-100 mb-5 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200 rounded-full opacity-30" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-300 rounded-full opacity-20" />

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-amber-100 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-amber-700">
                    50,000+ Orders
                  </span>
                  <span className="text-[11px] text-amber-500/80">
                    Delivered across India
                  </span>
                </div>
              </div>

              {/* Rating row */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className="w-3.5 h-3.5 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">
                    4.9 · 12,000+ reviews
                  </span>
                </div>

                {/* Avatar stack */}
                <div className="flex -space-x-2">
                  {[
                    "bg-gradient-to-br from-amber-300 to-amber-400",
                    "bg-gradient-to-br from-amber-200 to-amber-300",
                    "bg-gradient-to-br from-gray-200 to-gray-300",
                    "bg-gradient-to-br from-amber-400 to-amber-500",
                  ].map((c, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full ${c} border-2 border-white`}
                    />
                  ))}
                  <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">+99</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat pill — top right */}
            <div className="absolute top-4 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 z-20">
              <div className="w-8 h-8 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 leading-none mb-0.5">
                  1,200+ Styles
                </div>
                <div className="text-[10px] text-gray-400">
                  New arrivals weekly
                </div>
              </div>
            </div>

            {/* Floating pill — bottom left */}
            <div className="absolute bottom-8 left-0 bg-amber-500 rounded-2xl shadow-lg shadow-amber-200 px-4 py-3 flex items-center gap-2.5 z-20">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">
                7-Day Free Returns
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <div className="bg-amber-500 py-4 overflow-hidden border-y border-amber-400">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
          {[...Array(3)].map((_, gi) => (
            <div key={gi} className="flex gap-12">
              {[
                "Premium Quality",
                "Trend Forward",
                "Affordable Luxury",
                "Pan-India Delivery",
                "Secure Checkout",
                "Easy Returns",
                "Size Inclusive",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-3 text-white text-sm font-semibold tracking-wide"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-200 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="px-6 sm:px-10 py-28 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-600">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Built around your
              <br />
              shopping experience
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed sm:text-right sm:mb-1">
            Every feature is thoughtfully designed to make your fashion journey
            seamless, joyful, and trustworthy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.number}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-50 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle corner glow on hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                {/* Number + icon row */}
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-bold text-gray-100 group-hover:text-amber-100 transition-colors leading-none select-none">
                    {f.number}
                  </span>
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-amber-50 border border-amber-200 p-2.5 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300 shrink-0">
                    <img
                      src={f.icon}
                      alt={f.alt}
                      className="w-full h-full object-contain group-hover:brightness-[0] group-hover:invert transition-all"
                    />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-2.5 leading-snug">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {f.description}
                </p>
              </div>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-amber-400 to-amber-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-gray-50 border-y border-gray-100 px-6 sm:px-10 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Shop in three simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 relative">
            {/* Connector */}
            <div className="hidden sm:block absolute top-10 left-[calc(16%+40px)] right-[calc(16%+40px)] h-px bg-linear-to-r from-amber-200 via-amber-300 to-amber-200" />

            {[
              {
                step: "01",
                title: "Browse & Discover",
                desc: "Explore thousands of curated styles across men, women, and kids categories.",
              },
              {
                step: "02",
                title: "Pick Your Favourites",
                desc: "Add items to your wishlist or cart and choose your size with our fit guide.",
              },
              {
                step: "03",
                title: "Fast Delivery",
                desc: "Checkout securely and receive your order with real-time tracking updates.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative z-10 flex flex-col items-center text-center gap-5"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md border-2 transition-colors
                  ${
                    i === 1
                      ? "bg-amber-500 border-amber-500"
                      : "bg-white border-amber-200"
                  }`}
                >
                  <span
                    className={`text-2xl font-bold ${i === 1 ? "text-white" : "text-amber-500"}`}
                  >
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-55 mx-auto">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promise ── */}
      <section className="relative px-6 py-28 text-center overflow-hidden bg-amber-500">
        {/* Texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,#ffffff18,transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-100 mb-4">
            The Fabricue Promise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
            Fashion you can always trust
          </h2>
          <p className="text-amber-100 text-base leading-relaxed max-w-lg mx-auto mb-12">
            Every order is backed by our commitment to quality, transparency,
            and a shopping experience that keeps you coming back.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {promises.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-colors cursor-default backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};
