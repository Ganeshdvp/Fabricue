import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import {BASE_URL, passwordRegex} from '../utils/constants.js';
import { useState } from "react";
import { Loading } from "./Loading.js";

export const EnterPassword = () => {

    const navigate = useNavigate();
    const [password, setPassword] = useState(null);
    const [passwordError, setPasswordError] = useState(null);


  const {mutate, isPending, isError, error} = useMutation({
  mutationFn: async(data)=>{
    const res = await axios.post(BASE_URL + '/user/change-password', data, {
      withCredentials: true
    });
    return res?.data;
  },
  onSuccess: ()=>{
    navigate('/login');
    setPassword(null);
  },
});

const handleClick = ()=>{

  if(!password || !password.trim()) return;

  setPasswordError(null);

  if(!passwordRegex.test(password)){
    return setPasswordError('Password must contain uppercase, lowercase, number, and symbol!')
  }


  const data = {
    password : password.trim()
  }

  mutate(data);
}
       
      
  return (
    <>
    <div className="w-full flex items-center justify-center h-screen bg-[url(https://img.freepik.com/premium-photo/background-with-grip_1286621-341.jpg?semt=ais_rp_progressive&w=740&q=80)] bg-no-repeat bg-cover bg-center">
          <div className="bg-white text-gray-500 w-110 h-85 mx-4 md:p-6 p-4 text-left text-sm rounded-lg shadow-[0px_0px_10px_5px] shadow-black/10">
            <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">Create a New Password</h2>
            <p className="text-[12px] mb-8 translate-x-22 text-center mb-8 max-w-60">Enter a new password for your account to continue securely.</p>
            <label htmlFor="password">New Password</label>
            <input id="password" value={password} onChange={e=> setPassword(e.target.value)} className="w-full border mt-1 border-gray-500/30 focus:border-amber-500 outline-none rounded py-2.5 px-4" type="text" placeholder="Enter your new password" />
            {
              (isError || passwordError) && (
                    <p className="text-red-500 text-[12px] mt-1 ml-2 mb-4">{error?.response?.data?.message || passwordError}</p>
                  )
            }
            <button type="button" className="w-full my-3 bg-amber-500 active:scale-95 transition py-2.5 rounded text-white cursor-pointer hover:bg-amber-600" onClick={handleClick}>
              {
                isPending ? <Loading/> : "Save"
              }
            </button>
            <p className="text-[12px] translate-x-10 text-center mb-2 max-w-80">Note: Make sure your password is strong and keep it secure.</p>
        </div>
    </div>
    </>
  )
}
