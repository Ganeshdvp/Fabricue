import React, { useRef, useState, type FC } from "react";
import { Loading } from "./Loading";
import useContact from "../hooks/useContact";
import { emailRegex } from "../utils/constants";
import { toast } from "sonner";
import { ArrowRight, Mail, User } from "lucide-react";

export const Contact: FC = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const { mutate, isPending, isError, error } = useContact();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const nameVal = name.current?.value.trim();
    const emailVal = email.current?.value.trim();
    const messageVal = message.current?.value.trim();

    if (!nameVal || !emailVal || !messageVal) return;

    if (emailRegex.test(emailVal)) {
      mutate(
        { name: nameVal, email: emailVal, message: messageVal },
        {
          onSuccess: () => {
            toast.success("Message sent successfully!", { style: { background: "#fb923c", color: "#ffffff", border: "1px solid #fb923c", borderRadius: "10px", fontSize: "12px", width: "250px", height: "40px", }, });
            if (name.current) name.current.value = "";
            if (email.current) email.current.value = "";
            if (message.current) message.current.value = "";
          },
        }
      );
      setEmailError(null);
    } else {
      setEmailError("Invalid email format!");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mt-20 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center text-sm text-slate-800 max-w-xl mx-auto"
      >
        {/* Heading */}
        <p className="text-xs bg-amber-100 text-amber-500 font-medium px-3 py-1 rounded-full">
          Contact Us
        </p>

        <h2
          id="contact-heading"
          className="text-3xl md:text-4xl font-bold py-4 text-center"
        >
          Let’s Get In Touch
        </h2>

        <p className="text-gray-500 pb-10 text-center">
          Or reach us at{" "}
          <span className="text-amber-600">
            ganeshcherupalli6565@gmail.com
          </span>
        </p>

        <div className="w-full">
          {/* Name */}
          <label htmlFor="name" className="font-medium">
            Full Name
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-amber-400">
            <User size={16} aria-hidden="true" />
            <input
              id="name"
              type="text"
              ref={name}
              autoComplete="name"
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-amber-400">
            <Mail size={16} aria-hidden="true" />
            <input
              id="email"
              type="email"
              ref={email}
              autoComplete="email"
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Message */}
          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            ref={message}
            className="w-full mt-2 p-2 border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Enter your message"
            required
          />

          {/* Errors */}
          <div aria-live="polite" className="min-h-5 mt-2">
            {isError && (
              <p className="text-red-500 text-xs">{error.message}</p>
            )}
            {!isError && emailError && (
              <p className="text-red-500 text-xs">{emailError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-2 mt-6 bg-amber-500 hover:bg-amber-600 text-white py-2.5 w-full rounded-full transition focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {isPending ? (
              <Loading color={"border-white"} />
            ) : (
              <>
                Submit
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};