import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

// project imports
import MainLayout from "layout/MainLayout/MainLayout";
import Loadable from "components/ui-component/Loadable";
import WishList from "views/wishlist/Wishlist";
import Enquiries from "views/enquiries/MyEnquiries";
import useUser from "hooks/useUser";

// dashboard routing
const Login = Loadable(lazy(() => import("views/auth/Login")));
const SignUp = Loadable(lazy(() => import("views/auth/SignUp")));
const SearchResult = Loadable(lazy(() => import("views/place/SearchResult")));
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
        path: "place",
        children: [
          {
            path: "",
            element: <Place />,
          },
          {
            path: "search",
            element: <SearchResult />,
          },
          {
            path: "wishlist",
            element: <WishList />,
          },
        ],
      },
      {
        path: "my-enquiries",
        element: <Enquiries />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

export default function ThemeRoutes() {
  const { userInfo } = useUser();

  const routes = userInfo ? MainRoutes : MainRoutes.slice(0, 3);

  return useRoutes(routes);
}
