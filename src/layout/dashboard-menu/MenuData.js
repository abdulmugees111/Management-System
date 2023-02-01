const mainMenu = [
  { heading: "Overview" },
  {
    icon: "text-rich",
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: "tile-thumb",
    text: "My Subscriptions",
    link: "/projects",
  },
  {
    icon: "grid-alt",
    text: "Invoices & Payments",
    link: "/invoices",
  },
  {
    icon: "tranx",
    text: "Support",
    link: "/#",
    subMenu: [
      {
        text: "Knowledge Base",
        link: "/knowledge-base",
      },
      {
        text: "Tickets",
        link: "/help/tickets",
      },
    ]
  },
  // { heading: "Advanced" },
  {
    icon: "text-rich",
    text: "Account Settings",
    link: "/account-settings",
  },

];
export default mainMenu;
