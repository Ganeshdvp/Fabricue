import { useRef, useState } from "react";
import { Loading } from "./Loading";
import useContact from "../hooks/useContact";
import { emailRegex } from "../utils/constants";
import { toast } from "sonner";
import { ArrowBigRight, ArrowRight, Mail, MessageCircleCheck, User } from "lucide-react";

export const Contact = () => {
  const name = useRef(null);
  const email = useRef(null);
  const message = useRef(null);
  const [emailError, setEmailError] = useState(null);

  const { mutate, isPending, isError, error } = useContact();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name?.current?.value ||
      !email?.current?.value ||
      !message?.current?.value
    ) {
      return;
    }

    if (emailRegex.test(email?.current.value)) {
      const data = {
        name: name?.current?.value,
        email: email?.current?.value,
        message: message?.current?.value,
      };
      mutate(data, {
        onSuccess: () => {
      if (name.current) name.current.value = "";
      if (email.current) email.current.value = "";
      if (message.current) message.current.value = "";
      toast.success("Message sent successfully!", {
        style: {
          background: "#fb923c",
          color: "#ffffff",
          border: "1px solid #fb923c",
          borderRadius: "10px",
          fontSize: "12px",
          width: "250px",
          height: "40px",
        },
      });
    },
      });
      setEmailError(null);
    } else {
      setEmailError("Invalid email format!");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="contact"
        className="flex flex-col items-center text-sm text-slate-800 mt-12"
      >
        <p className="text-xs bg-amber-100 text-amber-500 font-medium px-3 py-1 rounded-full">
          Contact Us
        </p>
        <h1 className="text-4xl font-bold py-4 text-center">
          Let’s Get In Touch.
        </h1>
        <p className="max-md:text-sm text-gray-500 pb-10 text-center">
          Or just reach out manually to us at{" "}
          <span className="text-amber-600 hover:underline">
            ganeshcherupalli6565@gmail.com
          </span>
        </p>

        <div className="max-w-120 w-full px-4">
          <label htmlFor="name" className="font-medium">
            Full Name
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-amber-400 transition-all overflow-hidden">
            <User size={16}/>
            <input
              type="text"
              ref={name}
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          <label htmlFor="email-address" className="font-medium mt-4">
            Email Address
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-amber-400 transition-all overflow-hidden">
            <Mail size={16}/>
            <input
              type="email"
              ref={email}
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>

          <label htmlFor="message" className="font-medium mt-4">
            Message
          </label>
          <textarea
            rows="4"
            ref={message}
            className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-amber-400 transition-all"
            placeholder="Enter your message"
            required
          ></textarea>

          {isError ? (
            <p className="text-red-500 text-[12px]">
              {error.message}
            </p>
          ) : emailError ? (
            <p className="text-red-500 text-[12px]">{emailError}</p>
          ) : (
            ""
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-1 mt-5 bg-amber-500 hover:bg-amber-600 text-white py-2.5 w-full rounded-full transition"
          >
            {isPending ? (
              <Loading color={'border-white'} />
            ) : (
              <>
                Submit
                <ArrowRight size={16}/>
              </>
            )}
          </button>
        </div>
      </form>
  
    </>
  );
};
