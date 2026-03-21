import { useState } from "react";
import { useNavigate } from "react-router";
import { emailRegex } from '../utils/constants';
import { Loading } from "./Loading";
import useForgotPassword from "../hooks/useForgotPassword";


export const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [errorSend, setErrorSend] = useState(null);


    // send otp to server
    const {mutate, isPending, isError, error} = useForgotPassword();

    // send otp
    const handleSendEmail = ()=>{
      if(!email) return;
      setErrorSend(null);

      if(!emailRegex.test(email)){
        return setErrorSend('Invalid email format!');
      }

      mutate({email: email}, {
         onSuccess: (data)=>{
        sessionStorage.setItem('token',data?.data);
        navigate('/enter-otp', {state: {email}});
        setEmail(null);
      }
      });
    }

  return (
    <>
    <div className="w-full flex items-center justify-center h-screen bg-[url(https://img.freepik.com/premium-photo/background-with-grip_1286621-341.jpg?semt=ais_rp_progressive&w=740&q=80)] bg-no-repeat bg-cover bg-center">
          <div className="bg-white text-gray-500 w-110 h-85 mx-4 md:p-6 p-4 text-left text-sm rounded-lg shadow-[0px_0px_10px_5px] shadow-black/10">
            <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">Forget Password?</h2>
            <p className="px-4 text-center text-[12px] mb-8">No worries! Enter your registered email address and we’ll send you a link to reset your password.</p>
            <label htmlFor="email">Email</label>
            <input id="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full border mt-1 border-gray-500/30 focus:border-amber-500 outline-none rounded py-2.5 px-4" type="email" placeholder="Enter your email" />
            {
              (isError || errorSend) && (
                <p className="text-red-500 text-[12px] ml-2">
                  {error?.response?.data?.message || errorSend}
                </p>
              )
            }
            <button type="button" disabled={isPending} className="w-full my-6 bg-amber-500 active:scale-95 transition py-2.5 rounded text-white cursor-pointer hover:bg-amber-600" onClick={handleSendEmail}>
              {
                isPending ? <Loading color={'border-white'}/> : "Send Email"
              }
            </button>
            <p className="text-center">Don’t have an account? <span className="text-amber-500 underline cursor-pointer" onClick={()=> navigate('/login')}>Signup Now</span></p>
        </div>
    </div>
    </>
  )
}
