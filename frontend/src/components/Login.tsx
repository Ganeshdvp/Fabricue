import { Baseline } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { BASE_URL } from "../utils/constants.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "./Loading.js";

export const Login = () => {

  const queryClient = useQueryClient();

   const location = useLocation();
  const [toggle, setToggle] = useState(true);
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const store = useSelector((store) => store?.user);
  const navigate = useNavigate();


  // Initial Signup data
  const initialSignUpData = {
    fullName: "",
    email: "",
    password: "",
  };

  // Initial Login data
  const initialLoginData = {
    email: location?.state?.heroPageEmail || store?.email || "",
    password: "",
  };

  // SignUp Validations
  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[a-z]/g, "At least 1 lowercase letter required")
      .matches(/[A-Z]/g, "At least 1 uppercase letter required")
      .matches(/[0-9]/g, "At least 1 number required")
      .matches(/[^a-zA-Z0-9]/g, "At least 1 symbol required")
      .required("Password is required"),
  });

  // Login Validations
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[a-z]/g, "At least 1 lowercase letter required")
      .matches(/[A-Z]/g, "At least 1 uppercase letter required")
      .matches(/[0-9]/g, "At least 1 number required")
      .matches(/[^a-zA-Z0-9]/g, "At least 1 symbol required")
      .required("Password is required"),
  });

  // api call
  const {
    mutate: signUpMutate,
    isPending: signUpPending,
    isError: signUpErrorBoolean,
    error: signUpError,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + "/user/register", data);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(addUser(data?.data));
      setToggle(true);
    },
  });

  const {
    mutate: loginMutate,
    isPending: loginPending,
    isError: loginErrorBoolean,
    error: loginError,
  } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(BASE_URL + "/user/login", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["user"]});
      dispatch(addUser(data?.data));
      navigate("/home");
    },
  });
  // Submittion
  const handleSignUpSubmit = (values) => {
    const data = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
      role: role,
    };
    // register api
    signUpMutate(data);
  };

  const handleLoginSubmit = (values) => {
    // Login api
    loginMutate(values);
  };


  return (
    <>
      <div className="min-h-screen bg-[url(https://img.freepik.com/premium-photo/background-with-grip_1286621-341.jpg?semt=ais_rp_progressive&w=740&q=80)] bg-no-repeat bg-cover bg-center">
        <div className="flex justify-center pt-15">
          <Formik
            key={toggle ? "Login" : "Sign up"}
            enableReinitialize
            initialValues={toggle ? initialLoginData : initialSignUpData}
            validationSchema={toggle ? LoginSchema : SignupSchema}
            onSubmit={toggle ? handleLoginSubmit : handleSignUpSubmit}
          >
            <Form className="flex w-full flex-col items-center justify-center max-w-110 bg-gray-50 p-6 rounded-2xl shadow-xl">
              {/* tabs */}
              {!toggle && (
                <div className="flex space-x-1 max-w-62 p-1 text-[12px]">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="options"
                      id="user"
                      value="user"
                      onChange={() => setRole("user")}
                      className="hidden peer"
                      checked={role === "user"}
                    />
                    <label
                      htmlFor="user"
                      className="cursor-pointer py-1 px-4 text-gray-500 transition-colors duration-200 border-b-2 border-b-gray-300 peer-checked:border-amber-600 peer-checked:text-amber-700"
                    >
                      User
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="options"
                      id="seller"
                      value="seller"
                      onChange={() => setRole("seller")}
                      className="hidden peer"
                      checked={role === "seller"}
                    />
                    <label
                      htmlFor="seller"
                      className="cursor-pointer py-1 px-4 text-gray-500 transition-colors duration-200 border-b-2 border-b-gray-300 peer-checked:border-amber-600 peer-checked:text-amber-700"
                    >
                      Seller
                    </label>
                  </div>
                </div>
              )}

              {/* form */}
              <h2 className="text-4xl font-medium text-gray-900 mt-8">
                {toggle ? "Login" : "Sign up"}
              </h2>
              <p className="mt-3 text-sm text-center text-gray-500/90 mb-12">
                {toggle
                  ? "Sign in to continue exploring premium styles crafted for confidence and comfort."
                  : "Join Fabricue today and discover premium fashion designed for confidence and comfort."}
              </p>
              {!toggle && (
                <div className="flex flex-col justify-start w-full">
                  <div className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-lg border-2 border-gray-200 bg-transparent pl-5 focus-within:border-gray-300">
                    <Baseline size={17} color="gray" />
                    <Field
                      name="fullName"
                      placeholder={
                        role === "seller"
                          ? "Seller Full Name"
                          : "User Full Name"
                      }
                      className="h-full w-full bg-transparent text-sm placeholder-gray-400 outline-none"
                      required
                      type="text"
                    />
                  </div>
                  <ErrorMessage name="fullName">
                    {(msg) => (
                      <span className="text-[12px] text-amber-600 ml-4">
                        {msg}
                      </span>
                    )}
                  </ErrorMessage>
                </div>
              )}
              <div className="flex flex-col justify-start w-full">
                <div className="flex h-12 w-full mt-2 items-center gap-2 overflow-hidden rounded-lg border-2 border-gray-200 bg-transparent pl-5 focus-within:border-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail text-gray-400"
                    aria-hidden="true"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  </svg>
                  <Field
                    name="email"
                    placeholder={
                      role === "seller" ? "Seller Email id" : "User Email id"
                    }
                    className="h-full w-full bg-transparent text-sm placeholder-gray-400 outline-none"
                    required
                    type="email"
                  />
                </div>
                <ErrorMessage name="email">
                  {(msg) => (
                    <span className="text-[12px] text-amber-600 ml-4">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>
              <div className="flex flex-col justify-start w-full">
                <div className="mt-2 flex h-12 w-full items-center gap-2 overflow-hidden rounded-lg border-2 border-gray-200 bg-transparent pl-5 focus-within:border-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-lock text-gray-400"
                    aria-hidden="true"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <Field
                    name="password"
                    placeholder={
                      role === "seller" ? "Seller Password" : "User Password"
                    }
                    className="h-full w-full bg-transparent text-sm placeholder-gray-400 outline-none"
                    required
                    type="password"
                  />
                </div>
                <ErrorMessage name="password">
                  {(msg) => (
                    <span className="text-[12px] text-amber-600 ml-4">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>
              <button
                type="submit"
                disabled={loginPending || signUpPending}
                className="mt-8 h-11 w-full cursor-pointer rounded-lg bg-linear-to-b from-amber-400 to-amber-600 text-white transition hover:from-amber-500 hover:to-amber-400"
              >
                {toggle ? (
                  loginPending ? (
                    <Loading />
                  ) : (
                    "Login"
                  )
                ) : signUpPending ? (
                  <Loading />
                ) : (
                  "Sign Up"
                )}
              </button>
              {toggle ? (
                <Link to="/forgot-password">
                  <div className="mt-2 flex w-full items-center justify-center">
                    <span className="text-gray-800 underline">
                      Forgot password?
                    </span>
                  </div>
                </Link>
              ) : (
                ""
              )}
              <p className="mt-4 text-gray-500/90">
                {toggle
                  ? "Don’t have an account? "
                  : "Already have an account? "}
                <span
                  className="text-gray-800 underline cursor-pointer"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? "Sign up" : "Login"}
                </span>
              </p>
              <p className="mt-4 text-red-600 text-[13px]">
                {toggle
                  ? loginErrorBoolean
                    ? loginError?.response?.data?.message
                    : null
                  : signUpErrorBoolean
                    ? signUpError?.response?.data?.message
                    : null}
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
