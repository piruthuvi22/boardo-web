import { IconDashboard } from "@tabler/icons-react";
// ==============================|| MENU ITEMS ||============================== //

export const menuItems = {
  items: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "group",
      children: [
        {
          id: "default",
          title: "Dashboard",
          type: "item",
          url: "/app/dashboard",
          icon: IconDashboard,
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
          icon: IconDashboard,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "search",
      title: "Search",
      type: "group",
      children: [
        {
          id: "search",
          title: "Search",
          type: "item",
          url: "/app/search?query=moratuwa",
          icon: IconDashboard,
          breadcrumbs: false,
        },
      ],
    },
  ],
};
