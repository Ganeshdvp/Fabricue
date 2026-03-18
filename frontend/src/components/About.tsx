
export const About = () => {
  return (
    <>
    
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <h1 id="about" className="text-3xl font-semibold text-center mx-auto">About our apps</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
                Fabricue is a modern fashion brand delivering trend-forward styles with premium quality and everyday comfort.
            </p>
            <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8 md:px-0 pt-16">
                <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>
                <div className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 w-fit p-4 rounded-2xl hover:scale-102">
                    <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
                        <img src="../../public/badge.png" alt="badge-icon" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium">Premium Quality Materials</h3>
                        <p className="text-sm text-slate-200">We source high-quality fabrics to ensure comfort, durability, and long-lasting style in every piece.</p>
                    </div>
                </div>
                <div className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 w-fit p-4 rounded-2xl hover:scale-102">
                    <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
                        <img src="../../public/trending.png" alt="trending-icon" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium">Trend-Driven Collections</h3>
                        <p className="text-sm text-slate-200">Stay ahead with fresh arrivals inspired by the latest global fashion trends.</p>
                    </div>
                </div>
                <div className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 w-fit p-4 rounded-2xl hover:scale-102">
                    <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
                        <img src="../../public/diamond.png" alt="luxury-icon" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium">Affordable Luxury</h3>
                        <p className="text-sm text-slate-200">Experience premium fashion at prices that don’t break your budget.</p>
                    </div>
                </div>
                <div className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 w-fit p-4 rounded-2xl hover:scale-102">
                    <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
                        <img src="../../public/shield.png" alt="secure-icon" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium">Secure & Seamless Checkout</h3>
                        <p className="text-sm text-slate-200">Fast, safe, and encrypted payment process for a smooth shopping experience.</p>
                    </div>
                </div>
                <div className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 w-fit p-4 rounded-2xl hover:scale-102">
                    <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
                        <img src="../../public/tracking.png" alt="fast-icon" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium">Fast & Reliable Delivery</h3>
                        <p className="text-sm text-slate-200">Quick dispatch and reliable shipping across India with real-time tracking.</p>
                    </div>
                </div>
                <div className="text-white bg-linear-to-r from-amber-600 via-amber-500 to-amber-400 w-fit p-4 rounded-2xl hover:scale-102">
                    <div className="size-10 p-2 bg-amber-50 border border-amber-200 rounded">
                        <img src="../../public/resend.png" alt="return-icon" />
                    </div>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-base font-medium">Easy Returns & Support</h3>
                        <p className="text-sm text-slate-200">Hassle-free returns and dedicated customer support to ensure complete satisfaction.</p>
                    </div>
                </div>
            </div>
    </>
  )
}
