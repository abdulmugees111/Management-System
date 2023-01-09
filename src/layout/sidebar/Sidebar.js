import React from "react";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import Menu from "../menu/Menu";
import projectMenu from "../menu/MenuData";
import mainMenu from "../dashboard-menu/MenuData";
import { useTranslation } from "react-i18next";

const Sidebar = ({ fixed, theme, className, visibility, sidebarToggle, mobileView, layout, ...props }) => {
  const { i18n } = useTranslation();
  const classes = classNames({
    "nk-aside toggle-screen-lg": true,
    "content-active": visibility,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });

  return (
    <div
      className={classes}
      style={{
        paddingRight: i18n.language === "en" ? "0px" : "0px",
        paddingLeft: i18n.language === "ar" ? "32px" : "0px",
        margin: i18n.language === "ar" ? "0px" : "0px",
      }}
    >
      <SimpleBar className="nk-sidebar-menu">
        <Menu
          sidebarToggle={sidebarToggle}
          mobileView={mobileView}
          menuData={layout === "project" ? projectMenu() : layout === "main" ? mainMenu : mainMenu}
        />
      </SimpleBar>
    </div>
  );
};
export default Sidebar;
