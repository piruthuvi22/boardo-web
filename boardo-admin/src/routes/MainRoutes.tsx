import { lazy, useEffect } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

// project imports
import MainLayout from "layout/MainLayout/MainLayout";
import Loadable from "components/ui-component/Loadable";
import ReservationRequest from "views/reservations/ReservationRequests";
import useUser from "hooks/useUser";
import { User } from "firebase/auth";
import NotFound from "views/404";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

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
      // path: "/app",
      // element:
      //   loading && userInfo?.uid ? (
      //     <MainLayout />
      //   ) : (
      //     <Navigate to="/auth/login" replace />
      //   ),

      path: "/app",
      element: <MainLayout />,
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
  console.log("Private Route", isAuthenticated);

  if (isAuthenticated == null) return <Navigate to="/auth/login" replace />;
  return children;
};
