import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Home from "../Components/Home";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import ResetPassword from "../Auth/ResetPassword";

const PublicRoute = () => {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token);
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};
export const publicRoutes = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
        title: "Login",
      },
      {
        path: "/signup",
        element: <Signup />,
        title: "signup",
      },
      {
        path:"/reset-password/:token",
        element:<ResetPassword />,
        title:"Reset Password"
      }
      
    ],
  },
];
