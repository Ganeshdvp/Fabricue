import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL } from '../utils/constants.js';
import { Loading } from "./Loading";
import { useNavigate } from "react-router";



export const EnterOtp = () => {

  const [otp, setOtp] = useState(["","","","","",""]);
  const [otpError, setOtpError] = useState(null);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

 // otp change
  const handleOtpChange = (value, index) => {
  if (!/^\d?$/.test(value)) return;   // allow only numbers

  const newOtp = [...otp];
  newOtp[index] = value.trim();
  setOtp(newOtp);
  setOtpError(null);

  // move focus to next input
  if (value && index < 5) {
    inputRefs.current[index + 1].focus();
  }

};

const {mutate, isPending, isError, error} = useMutation({
  mutationFn: async(data)=>{
    const res = await axios.post(BASE_URL + '/user/verify-otp', data, {
      withCredentials: true
    });
    return res?.data;
  },
  onSuccess: ()=>{
    sessionStorage.removeItem('token');
    navigate('/change-password');
    setOtp(["","","","","",""]);
  },
})

// verify otp
  const handleVerifyOtp = ()=> {
    const otpValue = otp.join("").trim();
    const token = sessionStorage.getItem('token');

    if (otpValue.length !== 6) {
    return;
    };

    if(!token){
      return setOtpError('Something went wrong! Try again later.')
    }

    // data
    const data = {
      token: token,
      otp: otpValue
    }

    mutate(data)
  }


  return (
    <>
    <div className="min-h-screen w-full flex items-center justify-center bg-[url(https://img.freepik.com/premium-photo/background-with-grip_1286621-341.jpg?semt=ais_rp_progressive&w=740&q=80)] bg-no-repeat bg-cover bg-center">
              <div className="flex flex-col items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                <p className="text-2xl font-semibold text-gray-900">Email Verify OTP</p>
                <p className="mt-2 text-sm text-gray-900/60 text-center">Enter the 6-digit verification code sent to your registered email to continue.</p>
                <p className="text-[12px] text-black font-semibold mt-2 text-center">Note:- This OTP will expire in 5 minutes. For your safety, do not share this code with anyone.</p>
                <div className="grid grid-cols-6 gap-2 sm:gap-3 w-11/12 mt-8">
                {otp.map((digit, index) => (
    <input
      key={index}
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      value={digit}
      onChange={(e) => handleOtpChange(e.target.value, index)}
      onKeyDown={(e) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputRefs.current[index - 1].focus();
  }
}}
      maxLength="1"
      className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center focus:border border-amber-500"
    />
  ))}
                </div>

                {
                  (isError || otpError) && (
                    <p className="text-red-500 text-[12px] mt-6">{error?.response?.data?.message || otpError}</p>
                  )
                  }

                <button type="button" disabled={isPending} onClick={handleVerifyOtp} className="mt-8 w-full px-6 max-w-80 h-11 rounded-full text-white text-sm bg-amber-500 hover:opacity-90 transition-opacity cursor-pointer">
                    {
                      isPending ? <Loading/> : "Verify OTP"
                    }
                </button>
                <p className="mt-4 text-[12px]">Didn’t receive the code? <span className="text-amber-500 font-semibold underline cursor-pointer">Resend OTP</span></p>
            </div>
    </div>
    </>
  )
}
