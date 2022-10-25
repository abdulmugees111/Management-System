import React, {Fragment, useEffect, useState, useLayoutEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Head from "../head/Head";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import classNames from "classnames";
import menu from "../dashboard-menu/MenuData";

import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ settings }) => ({
  logo: settings.logo,
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  authPagesColor: settings.authPagesColor
});

const OrderLayout = ({
                      children,
                      logo,
                      isGrayTopbar,
                      isCardShadow,
                      isSquaredBorders,
                      isBorderless,
                      authPagesColor
                    }) => {
  //Sidebar
  const [mobileView, setMobileView] = useState();
  const [visibility, setVisibility] = useState(false);
  const [themeState] = useState({
    main: "default",
    header: "white",
    skin: "light",
  });

  useEffect(() => {
    viewChange();
  }, []);

  // Stops scrolling on overlay
  useLayoutEffect(() => {
    if (visibility) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
    if (!visibility) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [visibility]);

  useEffect(() => {
    document.body.className = `nk-body bg-white npc-default has-aside no-touch nk-nio-theme ${
      themeState.skin === "dark" ? "dark-mode" : " "
    }`;

    document.body.classList.remove("apps-only");
  }, [window.location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to toggle sidebar
  const toggleSidebar = (e) => {
    e.preventDefault();
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 1200) {
      setMobileView(true);
    } else {
      setMobileView(false);
      setVisibility(false);
    }
  };
  window.addEventListener("load", viewChange);
  window.addEventListener("resize", viewChange);

  const sidebarClass = classNames({
    "mobile-menu": mobileView,
    "nk-sidebar-active": visibility && mobileView,
  });


  return (
    <Fragment>
      <Head title="Loading" />
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-wrap">
            <Header
              sidebarToggle={toggleSidebar}
              setVisibility={setVisibility}
              fixed={true}
              theme={themeState.header}
            />
            <div className="nk-content">
              <div className="container wide-xl">
                <div className="nk-content-inner">
                  {/* <Sidebar
                    sidebarToggle={toggleSidebar}
                    visibility={visibility}
                    mobileView={mobileView}
                    fixed
                    theme="light"
                    className={sidebarClass}
                    layout='main'
                  />
                  {visibility && mobileView && <div className="toggle-overlay" onClick={(e) => toggleSidebar(e)} />} */}
                  <div className="nk-content-body" style={{paddingTop:'0px'}}>
                    <div>{children}</div>
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(connect(mapStateToProps)(OrderLayout));
