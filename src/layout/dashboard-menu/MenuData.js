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
    link: "/#",
  },
  {
    icon: "tranx",
    text: "Support",
    link: "/#",
    subMenu: [
      {
        text: "Knowledge Base",
        link: "/project-card",
      },
      {
        text: "Tickets",
        link: "/project-list",
      },
    ]
  },
  { heading: "Advanced" },
  {
    icon: "text-rich",
    text: "Account Settings",
    link: "/settings",
  },

  {
    icon: "grid-alt",
    text: "Applications",
    active: false,
    subMenu: [
      
    ],
  },

];
export default mainMenu;
