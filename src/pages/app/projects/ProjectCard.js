import React, { useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Row,
  Col,
} from "../../../components/Component";
import {
  Card,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProjectCardPage = ({projects, history}) => {
  const { t, i18n } = useTranslation(['projects','common']);
  const [sm, updateSm] = useState(false);
  const [data, setData] = useState(projects);

  return (
    <React.Fragment>
      <Head title={t("subscriptions_title")}></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> {t("subscriptions_title")} </BlockTitle>
              <BlockDes className="text-soft">{t("subscriptions_desc",{subs:data?data.length:0})}</BlockDes>
            </BlockHeadContent>
            <Col md='6'>
            </Col>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt" >
                      <Link to={'/pricing'}  >

                      <Button color="primary">
                        <Icon name="plus"></Icon>
                        <span>{t('add_subscription_btn',{ns:"common"})}</span>
                      </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          {
            data &&
            data.map((project, idx) => {
              return (
                <Card key={idx} className="card-bordered sp-plan">
                  <Row className="no-gutters">
                    <Col className="col-md-8">
                      <div className="sp-plan-info card-inner">
                        <Row className="gx-0 gy-3">
                          <div className="col-xl-9 col-sm-8">
                            <div className="sp-plan-name">
                            
                              <h6
                              style={{ marginRight:i18n.language === "ar" ? "1rem" : "0rem" ,width:"fit-content",textAlign: i18n.language === "ar" ? "right" : "left",  }}
                               className="title">
                                <Link to={`/project/${project.app_name}/overview`}>
                                  {project.name}
                                  <span  style={{ marginRight:i18n.language === "ar" ? "0.4rem" : "0rem" }}  className="badge bg-success rounded-pill">Active</span>
                                </Link>
                              </h6>
                              <p style={{ marginRight:i18n.language === "ar" ? "1rem" : "0rem" ,width:"fit-content",textAlign: i18n.language === "ar" ? "right" : "left" }}>
                              <span>{t('project ID',{ns:"common"})}</span>
                              :
                                
                                 <span className="text-base">{project.app_name}</span>
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-3 col-sm-4">
                            <div className="sp-plan-opt">
                              <div className="custom-control custom-switch checked">
                                <label className="custom-control-label text-soft" htmlFor="auto-plan-p1">
                                 <span>{t('Auto Renew',{ns:"common"})}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </div>
                      <div className="sp-plan-desc card-inner">
                        <ul className="row gx-1">
                          <li className="col-6 col-lg-3">
                            <p style={{ marginRight:i18n.language === "ar" ? "1rem" : "0rem" ,width:"fit-content",textAlign: i18n.language === "ar" ? "right" : "left" }}>
                              <span className="text-soft">
                              <span>{t('Started On',{ns:"common"})}</span>
                              </span> Oct 12, 2018
                            </p>
                          </li>
                          <li  className="col-6 col-lg-3">
                            <p  style={{ marginRight:i18n.language === "ar" ? "1rem" : "0rem" ,width:"fit-content",textAlign: i18n.language === "ar" ? "right" : "left" }}>
                              <span className="text-soft">
                              <span>{t('Recurring',{ns:"common"})}</span>
                              </span> 
                              <span>{t('Yes',{ns:"common"})}</span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <div className="col-md-4">
                      <div className="sp-plan-action card-inner">
                        <div className="sp-plan-btn">
                          <Link to={`/project/${project.app_name}/overview`} className="btn btn-primary">
                          <span>{t('More Info',{ns:"common"})}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Card>
              );
            })
          }
          <br/>
          <br/>
        </Block>

      </Content>
    </React.Fragment>
  );
};
export default ProjectCardPage;
