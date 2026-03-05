import { ChartNoAxesColumnDecreasing, ChevronsUp, ShieldCheck } from "lucide-react"

export const Feature = () => {
  return (
    <>
        <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <h2 className="text-2xl font-semibold text-center mt-36">What we provided</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                <div className="size-[520px] top-0 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]/70"></div>
                <div className="flex flex-col items-center justify-center max-w-80 mx-auto">
                    <div className="p-6 aspect-square bg-amber-100 rounded-full">
                        <ChartNoAxesColumnDecreasing/>
                    </div>
                    <div className="mt-5 space-y-2 text-center">
                        <h3 className="text-base font-semibold text-slate-700">Premium Quality & Comfort</h3>
                        <p className="text-sm text-slate-600">Crafted with high-grade fabrics and attention to detail, every GIHEAF piece delivers lasting comfort and durability.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center max-w-80 mx-auto">
                    <div className="p-6 aspect-square bg-amber-100 rounded-full">
                        <ChevronsUp/>
                    </div>
                    <div className="mt-5 space-y-2 text-center">
                        <h3 className="text-base font-semibold text-slate-700">Fast Delivery & Easy Returns</h3>
                        <p className="text-sm text-slate-600">Quick shipping and hassle-free returns ensure a smooth, worry-free shopping experience every time.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center max-w-80 mx-auto">
                    <div className="p-6 aspect-square bg-amber-100 rounded-full">
                        <ShieldCheck/>
                    </div>
                    <div className="mt-5 space-y-2 text-center">
                        <h3 className="text-base font-semibold text-slate-700">Secure & Seamless Checkout</h3>
                        <p className="text-sm text-slate-600">Shop confidently with encrypted payments and a fast, user-friendly checkout process.</p>
                    </div>
                </div>
            </div>
    </>
  )
}
