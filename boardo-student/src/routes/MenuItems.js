import {
  AccountCircle,
  AddHome,
  Bookmark,
  Bookmarks,
  Dashboard,
  Favorite,
  Home,
  HomeWork,
} from "@mui/icons-material";
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
          icon: Dashboard,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "places",
      title: "Places",
      type: "group",
      children: [
        {
          id: "search-places",
          title: "Search Places",
          type: "item",
          url: "/app/place/search",
          icon: Home,
          breadcrumbs: false,
        },
        {
          id: "wishlist",
          title: "Wishlist",
          type: "item",
          url: "/app/place/wishlist",
          icon: Favorite,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "enquiry",
      title: "My Enquiries",
      type: "group",
      children: [
        {
          id: "my-enquiries",
          title: "My Enquiries",
          type: "item",
          url: "/app/my-enquiries",
          icon: Bookmark,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "profile",
      title: "Profile",
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
