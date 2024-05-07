import {
  AccountCircle,
  AddHome,
  Dashboard,
  Home,
  HomeWork,
} from "@mui/icons-material";
// ==============================|| MENU ITEMS ||============================== //

export const menuItems = {
  items: [
    {
      id: "my-places",
      title: "My Places",
      type: "group",
      children: [
        {
          id: "my-places",
          title: "My Places",
          type: "collapse",
          icon: HomeWork,
          breadcrumbs: false,
          children: [
            {
              id: "all-places",
              title: "All Places",
              type: "item",
              url: "/app/place/my-places",
              icon: Home,
              breadcrumbs: false,
            },
          ],
        },
      ],
    },
    {
      id: "reservation",
      title: "Reservation",
      type: "group",
      children: [
        {
          id: "reservation",
          title: "Reservation",
          type: "item",
          url: "/app/reservation-request",
          icon: AddHome,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "profile",
      type: "group",
      children: [
        {
          id: "profile",
          title: "Profile",
          type: "item",
          url: "/app/profile",
          icon: AccountCircle,
          breadcrumbs: false,
        },
      ],
    },
  ],
};
