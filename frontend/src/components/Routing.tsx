import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Body } from "./Body";
import { Login } from "./Login";
import { Home } from "./Home";
import { Cart } from "./Cart";
import { WishList } from "./WishList";
import { ViewProduct } from "./ViewProduct";
import { ForgotPassword } from "./ForgotPassword";
import { EnterOtp } from "./EnterOtp";
import { EnterPassword } from "./EnterPassword";
import { PrivateRoutes } from "./protectedRoutes/PrivateRoutes";
import { PublicRoutes } from "./protectedRoutes/PublicRoutes";
import { Tabs } from "./Tabs.js";
import { Orders } from "./Orders.js";
import { OrderSuccess } from "./OrderSuccess.js";
import { Profile } from "./Profile.js";

export const Routing = () => {

  const routing = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoutes>
          <Body />
        </PublicRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <PublicRoutes>
          <ForgotPassword />
        </PublicRoutes>
      ),
    },
    {
      path: "/enter-otp",
      element: (
        <PublicRoutes>
          <EnterOtp />
        </PublicRoutes>
      ),
    },
    {
      path: "/change-password",
      element: (
        <PublicRoutes>
          <EnterPassword />
        </PublicRoutes>
      ),
    },
    {
      path: "/home",
      element: (
        <PrivateRoutes>
          <Home />
        </PrivateRoutes>
      ),
      children: [
        { path: "", element: <Tabs /> },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <WishList /> },
        { path: "view/:id", element: <ViewProduct /> },
        { path: "orders", element: <Orders /> },
        { path: "profile", element: <Profile/>}
      ],
    },
    {
      path: "/success",
      element: (
        <PrivateRoutes>
          <OrderSuccess />
        </PrivateRoutes>
      ),
    },
  ]);

  return <RouterProvider router={routing} />;
};
