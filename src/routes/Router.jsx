import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPass from "../pages/ForgotPass";
import App from "../App";
import Dashboard from "../pages/Dashboard";

const Router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/forgot-pass",
        element: <ForgotPass></ForgotPass>,
      },
    ],
  },
]);

export default Router;
