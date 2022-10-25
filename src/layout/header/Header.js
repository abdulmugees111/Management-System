import React from "react";
import classNames from "classnames";
import Logo from "../logo/Logo";
import User from "./dropdown/user/User";
import Notification from "./dropdown/notification/Notification";
import Toggle from "../sidebar/Toggle";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = ({ fixed, theme, className, sidebarToggle, setVisibility, ...props }) => {

  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
    [`${className}`]: className,
  });
const { pathname } = useLocation();
  
 
  return (
    <div className={headerClass}>
      <div className="container-lg wide-xl">
        <div className="nk-header-wrap">
          <div className="nk-header-brand">
            <Logo />
          </div>
          <div className="nk-header-menu">
            <ul className="nk-menu nk-menu-main">
              <li className={`nk-menu-item ${pathname === "/" || pathname === '/dashboard' ? "active current-page" : ""}`}>
                <Link to={`${process.env.PUBLIC_URL}/`} className="nk-menu-link">
                  <span className="nk-menu-text">Overview</span>
                </Link>
              </li>
              {/* <li
                className={`nk-menu-item ${currentUrl === process.env.PUBLIC_URL + "/projects" ? "active current-page" : ""
                  }`}
              >
                <Link to={`${process.env.PUBLIC_URL}/projects`} className="nk-menu-link">
                  <span className="nk-menu-text">Projects</span>
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="notification-dropdown" onClick={() => setVisibility(false)}>
                <Notification />
              </li>
              <li className="user-dropdown" onClick={() => setVisibility(false)}>
                <User />
              </li>
              <li className="d-lg-none">
                <Toggle icon="menu" className="toggle nk-quick-nav-icon mr-n1" click={sidebarToggle} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
