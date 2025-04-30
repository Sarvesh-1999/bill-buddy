import React from "react";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const myRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/userdashboard",
          element: <UserDashboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={myRoutes}></RouterProvider>;
};

export default App;
