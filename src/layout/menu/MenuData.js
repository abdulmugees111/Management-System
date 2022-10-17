const menu = [
  { heading: "Overview" },
  {
    icon: "text-rich",
    text: "Subscription Overview",
    link: "/project/overview",
  },
  {
    icon: "grid-alt",
    text: "Domain & SSL",
    link: "/project/domain-ssl",
  },
  { heading: "Advanced" },
  {
    icon: "text-rich",
    text: "Project Settings",
    link: "/project/settings",
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
