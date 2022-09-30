import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";
import Head from "../../../layout/head/Head";
import Header from "../../../layout/header/Header";
import Footer from "../../../layout/footer/Footer";
import classNames from "classnames";
import menu from "../../../layout/menu/MenuData";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  FormGroup,
  ModalBody,
  Modal,
  DropdownItem,
  Form
} from "reactstrap";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Col,
  UserAvatar,
  PaginationComponent,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem
} from "../../../components/Component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Content from "../../../layout/content/Content";
import actions from "../../../redux/projects/actions";

const mapStateToProps = ({ projects, dispatch }) => ({
  projects: projects,
  dispatch: dispatch
});

const Projects = ({ projects, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_PROJECTS
    });
  }, []);

  //Sidebar
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
    document.body.className = `nk-body bg-white npc-default has-aside no-touch nk-nio-theme ${
      themeState.skin === "dark" ? "dark-mode" : " "
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


  const data = projects.data;
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
            <div className="nk-content">
              <div className="container wide-xl">
                <div className="nk-content-inner">
                  <div className="nk-content-body">
                    <Content>
                      <BlockHead size="sm">
                        <BlockBetween>
                          <BlockHeadContent>
                            <BlockTitle page> Projects</BlockTitle>
                            <BlockDes className="text-soft">You have total {data.count} projects</BlockDes>
                          </BlockHeadContent>
                          <BlockHeadContent>
                          </BlockHeadContent>
                        </BlockBetween>
                      </BlockHead>
                      <Block>
                        <DataTable className="card-stretch">
                          <DataTableBody>
                            <DataTableHead className="nk-tb-item nk-tb-head">
                              <DataTableRow className="nk-tb-col-check">
                                <div className="custom-control custom-control-sm custom-checkbox notext">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input form-control"
                                    id="pid-all"
                                    // onChange={(e) => selectorCheck(e)}
                                  />
                                  <label className="custom-control-label" htmlFor="pid-all"></label>
                                </div>
                              </DataTableRow>
                              <DataTableRow>
                                <span className="sub-text">Project Name</span>
                              </DataTableRow>

                            </DataTableHead>
                            {data.count > 0
                              ? data.results.map((item) => {
                                return (
                                  <DataTableItem key={item.id}>
                                    <DataTableRow className="nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input form-control"
                                          defaultChecked={item.checked}
                                          id={item.id + "pid-all"}
                                          // key={Math.random()}
                                        />
                                        <label className="custom-control-label" htmlFor={item.id + "pid-all"}></label>
                                      </div>
                                    </DataTableRow>
                                    <DataTableRow>
                                      <a
                                        href="#title"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                        className="project-title"
                                      >

                                        <div className="project-info">
                                          <h6 className="title">{item.name}</h6>
                                        </div>
                                      </a>
                                    </DataTableRow>
                                  </DataTableItem>
                                );
                              })
                              : null}
                          </DataTableBody>
                        </DataTable>
                      </Block>

                    </Content>

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

export default withRouter(connect(mapStateToProps)(Projects));
