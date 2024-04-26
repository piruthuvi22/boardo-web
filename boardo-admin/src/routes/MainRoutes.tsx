import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "components/ui-component/Loadable";

// dashboard routing
const Login = Loadable(lazy(() => import("views/auth/Login")));
const SignUp = Loadable(lazy(() => import("views/auth/SignUp")));
const Dashboard = Loadable(lazy(() => import("views/dashboard/Dashboard")));
const SearchResult = Loadable(lazy(() => import("views/SearchResult")));
const Place = Loadable(lazy(() => import("views/place/Place")));
const Profile = Loadable(lazy(() => import("views/profile/Profile")));
const Home = Loadable(lazy(() => import("views/home/Home")));
const CreatePlace = Loadable(lazy(() => import("views/place/CreatePlace")));

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
        children: [
          {
            path: "my-places",
            element: <SearchResult />,
          },
          {
            path: "",
            element: <Place />,
          },
          {
            path: "create-place",
            element: <CreatePlace />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

export default function ThemeRoutes() {
  return useRoutes(MainRoutes);
}
