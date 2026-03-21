import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./protectedRoutes/PrivateRoutes";
import { PublicRoutes } from "./protectedRoutes/PublicRoutes";
import { lazy, Suspense } from "react";
import { HeroPageShimmer } from "./errorAndLoading/HeroPageShimmer";
import { TabsShimmer } from "./errorAndLoading/TabsShimmer";



// lazy loading route level
const Body = lazy(() => import("./Body").then(m => ({ default: m.Body })));
const Login = lazy(() => import("./Login").then(m => ({ default: m.Login })));
const Home = lazy(() => import("./Home").then(m => ({ default: m.Home })));
const Cart = lazy(() => import("./Cart").then(m => ({ default: m.Cart })));
const WishList = lazy(() => import("./WishList").then(m => ({ default: m.WishList })));
const ViewProduct = lazy(() => import("./ViewProduct").then(m => ({ default: m.ViewProduct })));
const ForgotPassword = lazy(() => import("./ForgotPassword").then(m => ({ default: m.ForgotPassword })));
const EnterOtp = lazy(() => import("./EnterOtp").then(m => ({ default: m.EnterOtp })));
const EnterPassword = lazy(() => import("./EnterPassword").then(m => ({ default: m.EnterPassword })));
const Tabs = lazy(() => import("./Tabs").then(m => ({ default: m.Tabs })));
const Orders = lazy(() => import("./Orders").then(m => ({ default: m.Orders })));
const OrderSuccess = lazy(() => import("./OrderSuccess").then(m => ({ default: m.OrderSuccess })));
const Profile = lazy(() => import("./Profile").then(m => ({ default: m.Profile })));
const OrderSummary = lazy(() => import("./OrderSummary").then(m => ({ default: m.OrderSummary })));
const HomeAbout = lazy(() => import("./HomeAbout").then(m => ({ default: m.HomeAbout })));
const Contact = lazy(() => import("./Contact").then(m => ({ default: m.Contact })));
const HomeFaqs = lazy(() => import("./HomeFaqs").then(m => ({ default: m.HomeFaqs })));



export const Routing = () => {

  const routing = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoutes>
          <Suspense fallback={<HeroPageShimmer/>}>
          <Body />
          </Suspense>
        </PublicRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <Suspense fallback={<p>Loading...</p>}>
          <Login />
          </Suspense>
        </PublicRoutes>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <PublicRoutes>
           <Suspense fallback={<p>Loading...</p>}>
          <ForgotPassword />
          </Suspense>
        </PublicRoutes>
      ),
    },
    {
      path: "/enter-otp",
      element: (
        <PublicRoutes>
          <Suspense fallback={<p>Loading...</p>}>
          <EnterOtp />
          </Suspense>
        </PublicRoutes>
      ),
    },
    {
      path: "/change-password",
      element: (
        <PublicRoutes>
          <Suspense fallback={<p>Loading...</p>}>
          <EnterPassword />
          </Suspense>
        </PublicRoutes>
      ),
    },
    {
      path: "/home",
      element: (
        <PrivateRoutes>
          <Suspense fallback={<TabsShimmer/>}>
          <Home />
          </Suspense>
        </PrivateRoutes>
      ),
      children: [
        { path: "", element: <Tabs /> },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <WishList /> },
        { path: "view/:id", element: <ViewProduct /> },
        { path: 'payment', element: <OrderSummary/>},
        { path: "orders", element: <Orders /> },
        { path: "profile", element: <Profile/>},
        { path: "about", element: <HomeAbout/>},
        { path: "contact", element: <Contact/>},
        { path: 'faqs', element: <HomeFaqs/>}
      ],
    },
    {
      path: "/success",
      element: (
        <PrivateRoutes>
          <Suspense fallback={<p>Loading...</p>}>
          <OrderSuccess />
          </Suspense>
        </PrivateRoutes>
      ),
    },
  ]);

  return (
    <RouterProvider router={routing} />
  )
};
