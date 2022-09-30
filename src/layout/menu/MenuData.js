const menu = [
  { heading: "Overview" },
  {
    icon: "text-rich",
    text: "SaaS Dashboard",
    link: "/dashboard",
  },
  {
    icon: "grid-alt",
    text: "Domain & SSL",
    link: "/domain-ssl",
  },
  {
    icon: "tile-thumb",
    text: "My Subscription",
    link: "/subscription",
  },
  {
    icon: "tranx",
    text: "Payment History",
    link: "/payment-history",
  },
  { heading: "Advanced" },
  {
    icon: "text-rich",
    text: "Project Settings",
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
export default menu;
