import { createBrowserRouter, RouterProvider } from "react-router";
import { Body } from "./Body";
import { Login } from "./Login";
import { Home } from "./Home";
import { Cart } from "./Cart";
import { WishList } from "./WishList";
import { ViewProduct } from "./ViewProduct";
import { ForgotPassword } from "./ForgotPassword";
import { EnterOtp } from './EnterOtp';
import { EnterPassword } from './EnterPassword';


const routing = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: '/enter-otp',
    element: <EnterOtp/>
  },
  {
    path: '/change-password',
    element: <EnterPassword/>
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/view/:id",
    element: <ViewProduct />,
  },
]);

export const Routing = () => {
  return <RouterProvider router={routing} />;
};
