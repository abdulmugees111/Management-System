import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import Head from "../../../layout/head/Head";
import Header from "../../../layout/header/Header";
import Footer from "../../../layout/footer/Footer";
import { Block } from "../../../components/Component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Content from "../../../layout/content/Content";
import actions from "../../../redux/projects/actions";
import ProjectCardPage from "./ProjectCard";
import menu from "../../../layout/menu/MenuData";
import { Spinner } from "reactstrap"
import Sidebar from "../../../layout/sidebar/Sidebar";
import classNames from "classnames";


const Projects = ({ projects, dispatch }) => {

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_PROJECTS
    });
  }, []);

  //Sidebar
  const [list, setList] = useState(projects.data.results);
  const [mobileView, setMobileView] = useState();
  const [visibility, setVisibility] = useState(false);
  const [themeState] = useState({
    main: "default",
    header: "white",
    skin: "light"
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
    document.body.className = `nk-body bg-white npc-default has-aside no-touch nk-nio-theme ${themeState.skin === "dark" ? "dark-mode" : " "
      }`;
    let apps = menu.find((item) => item.text === "Applications");
    let matched = apps.subMenu.find((sub) => {
      if (process.env.PUBLIC_URL + sub.link === window.location.pathname) {
        return sub;
      } else if (window.location.pathname.split("/")[2] === "app-file-manager") {
        return sub;
      }
    });
    if (matched) {
      document.body.classList.add("apps-only");
    } else {
      document.body.classList.remove("apps-only");
    }
  }, [window.location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const toggleSidebar = (e) => {
    e.preventDefault();
    if (visibility === false) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  };


  return (
    <Fragment>
      <Head title="Projects" />
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-wrap">
            <Header
              setVisibility={setVisibility}
              fixed={true}
              theme={themeState.header}
            />
            {/* <div className="nk-content">
              <div className="container wide-xl">
                <div className="nk-content-inner">
                  <div className="nk-content-body"> */}
                    <Content>
                      <Block>
                        {
                          projects.isLoading && <Spinner color="primary" />
                        }
                        {
                          projects.data.count !== -1 &&
                            <ProjectCardPage projects={projects.data.results}  />
                        }

                      </Block>
                    </Content>
                    <Footer />
                  {/* </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>

  );
};

const mapStateToProps = ({ projects, dispatch }) => ({
  projects: projects,
  dispatch: dispatch
});

export default withRouter(connect(mapStateToProps)(Projects));
