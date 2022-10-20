const menu = () => {

  const path_segments = window.location.hash.split('/')
  const app_name = path_segments[path_segments.length-2]

  return [
    { heading: "Overview" },
    {
      icon: "text-rich",
      text: "Subscription Overview",
      link: `/project/${app_name}/overview`
    },
    {
      icon: "grid-alt",
      text: "Domain & SSL",
      link: `/project/${app_name}/domain-ssl`
    },
    { heading: "Advanced" },
    {
      icon: "text-rich",
      text: "Project Settings",
      link: `/project/${app_name}/settings`
    }
  ];

};
export default menu;