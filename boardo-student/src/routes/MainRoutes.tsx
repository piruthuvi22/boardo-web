import { Component, lazy, ReactNode } from "react";
import {
  Route,
  RouteObject,
  useRoutes,
  useNavigate,
  Navigate,
} from "react-router-dom";

// project imports
import MainLayout from "layout/MainLayout/MainLayout";
import Loadable from "components/ui-component/Loadable";
import WishList from "views/wishlist/Wishlist";
import Enquiries from "views/enquiries/MyEnquiries";
import useUser from "hooks/useUser";
import { User } from "firebase/auth";
import NotFound from "views/404";

// dashboard routing
const Login = Loadable(lazy(() => import("views/auth/Login")));
const SignUp = Loadable(lazy(() => import("views/auth/SignUp")));
const SearchResult = Loadable(lazy(() => import("views/place/SearchResult")));
const Place = Loadable(lazy(() => import("views/place/Place")));
const Profile = Loadable(lazy(() => import("views/profile/Profile")));
const Home = Loadable(lazy(() => import("views/home/Home")));

// ==============================|| MAIN ROUTING ||============================== //
export default function ThemeRoutes() {
  const { userInfo } = useUser();

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
      // path: "/app",
      // element: (
      //   <PrivateRoute children={<MainLayout />} isAuthenticated={userInfo} />
      // ),
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
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const routes = userInfo ? MainRoutes : MainRoutes.slice(0, 3);
  return useRoutes(routes);
}

const PrivateRoute = ({
  children,
  isAuthenticated,
}: {
  children: any;
  isAuthenticated: User | null;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};
