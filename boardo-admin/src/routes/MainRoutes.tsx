import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "components/ui-component/Loadable";
import SearchResult from "views/SearchResult";
import Login from "views/auth/Login";
import SignUp from "views/auth/SignUp";

// dashboard routing
const Dashboard = Loadable(lazy(() => import("views/dashboard/Dashboard")));
const Place = Loadable(lazy(() => import("views/place/Place")));
const Profile = Loadable(lazy(() => import("views/profile/Profile")));
const Home = Loadable(lazy(() => import("views/home/Home")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "place",
        element: <Place />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "search?",
        element: <SearchResult />,
      },
    ],
  },
];

export default function ThemeRoutes() {
  return useRoutes(MainRoutes);
}
