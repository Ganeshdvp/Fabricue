import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
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

export const Routing = ({ store }) => {
  const routing = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoutes store={store}>
          <Body />
        </PublicRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes store={store}>
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <PublicRoutes store={store}>
          <ForgotPassword />
        </PublicRoutes>
      ),
    },
    {
      path: "/enter-otp",
      element: (
        <PublicRoutes store={store}>
          <EnterOtp />
        </PublicRoutes>
      ),
    },
    {
      path: "/change-password",
      element: (
        <PublicRoutes store={store}>
          <EnterPassword />
        </PublicRoutes>
      ),
    },
    {
      path: "/home",
      element: (
        <PrivateRoutes store={store}>
          <Home />
        </PrivateRoutes>
      ),
      children: [
        {
          path: "",
          element: (
            <PrivateRoutes store={store}>
              <Tabs />
            </PrivateRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <PrivateRoutes store={store}>
              <Cart />
            </PrivateRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <PrivateRoutes store={store}>
              <WishList />
            </PrivateRoutes>
          ),
        },
        {
      path: "view/:id",
      element: (
        <PrivateRoutes store={store}>
          <ViewProduct />
        </PrivateRoutes>
      ),
    },
    {
          path: "orders",
          element: (
            <PrivateRoutes store={store}>
              <Orders />
            </PrivateRoutes>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routing} />;
};
