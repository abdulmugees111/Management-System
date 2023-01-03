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
import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";


const Projects = ({ projects, dispatch }) => {

  const {i18n}=useTranslation()

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_PROJECTS
    });
  }, []);

  //Sidebar
  const [list, setList] = useState(projects?.data?.results);
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



  return (
    <Fragment>
      <Head title="Projects" />
      <div className="nk-app-root">
        <div className="nk-main">
          <div className="nk-wrap" style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}}>
            <Header
              setVisibility={setVisibility}
              fixed={true}
              theme={themeState.header}
            />
            <Content>
              <Block>
                {
                  projects.isLoading && <Spinner color="primary" />
                }
                {
                  projects?.data?.count !== -1 &&
                  <ProjectCardPage projects={projects?.data?.results} />
                }
              </Block>
            </Content>
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
