import React from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Menu from "../menu/Menu";
import projectMenu from "../menu/MenuData";
import mainMenu from "../dashboard-menu/MenuData";

const Sidebar = ({ fixed, theme, className, visibility, sidebarToggle, mobileView, layout, ...props }) => {
  const classes = classNames({
    "nk-aside toggle-screen-lg": true,
    "content-active": visibility,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });

  return (
    <div className={classes}>
      <SimpleBar className="nk-sidebar-menu">
        
        <Menu
         sidebarToggle={sidebarToggle}
         mobileView={mobileView}
         menuData={layout === 'project' ? projectMenu : layout === 'main' ? mainMenu : mainMenu} />
         
      </SimpleBar>
    </div>
  );
};
export default Sidebar;
