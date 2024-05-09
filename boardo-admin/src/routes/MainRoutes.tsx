import { lazy } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

// project imports
import MainLayout from "layout/MainLayout/MainLayout";
import Loadable from "components/ui-component/Loadable";
import ReservationRequest from "views/reservations/ReservationRequests";
import useUser from "hooks/useUser";
import { User } from "firebase/auth";
import NotFound from "views/404";

// dashboard routing
const Login = Loadable(lazy(() => import("views/auth/Login")));
const SignUp = Loadable(lazy(() => import("views/auth/SignUp")));
const MyPlaces = Loadable(lazy(() => import("views/MyPlaces")));
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
      path: "/app",
      element: (
        <PrivateRoute children={<MainLayout />} isAuthenticated={userInfo} />
      ),
      children: [
        {
          path: "place",
          children: [
            {
              path: "my-places",
              element: <MyPlaces />,
            },
            {
              path: "",
              element: <Place />,
            },
          ],
        },
        {
          path: "reservation-request",
          element: <ReservationRequest />,
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

  return useRoutes(MainRoutes);
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
