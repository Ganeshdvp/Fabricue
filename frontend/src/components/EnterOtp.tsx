
export const EnterOtp = () => {
  return (
    <>
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
              <div className="flex flex-col items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                <p className="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
                <p className="mt-2 text-sm text-gray-900/90 text-center">Enter the 6-digit code sent to your email ID.</p>
        
                <div className="grid grid-cols-6 gap-2 sm:gap-3 w-11/12 mt-8">
                    <input type="text" maxLength="1" className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength="1" className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength="1" className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength="1" className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength="1" className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                    <input type="text" maxLength="1" className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center" />
                </div>
        
                <button type="button" className="mt-8 w-full max-w-80 h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity">
                    Verify Email
                </button>
            </div>
    </div>
    </>
  )
}
