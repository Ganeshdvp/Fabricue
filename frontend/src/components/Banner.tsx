import { BaggageClaim, Gift, ShieldCheck } from 'lucide-react';

export const Banner = () => {
  return (
    <>
       <div className="w-full py-2.5 font-medium text-sm text-white bg-linear-to-r from-amber-400 via-amber-500 to-amber-600">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
                <p className='flex gap-x-1'><BaggageClaim size={16}/> Free Shipping on Orders</p>
                <span className="hidden sm:inline">|</span>
                <p className='flex gap-x-1'><Gift size={16}/> Easy returns</p>
                <span className="hidden sm:inline">|</span>
                <p className='flex gap-x-1'><ShieldCheck size={16}/> Secure Payments</p>
            </div>
        </div>
    </>
  );
};
