import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OTPverification from "../pages/OTPverification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/userMenuMobile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp-verify",
        element: <OTPverification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "mobile-user",
        element: <UserMenuMobile />,
      },
    ],
  },
]);

export default router;
