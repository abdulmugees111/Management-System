import React, { useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";

import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockContent,
  Button,
  Row,
  Col,
  PreviewCard,
  BlockBetween,
} from "../../../components/Component";
import { Link } from "react-router-dom";
import { profileIcon, accountIcon, billingIcon, securityIcon, supportIcon } from "./components/svgIcons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Dashboard = ({ user }) => {
  const { t, i18n } = useTranslation(["dashboard", "common"]);
  const [sm, updateSm] = useState(false);

  const cardsData = [
    {
      title: t("personal_info_title"),
      description: t("personal_info_desc"),
      buttonText: t("manage_account_btn", { ns: "common" }),
      url: "/user-profile",
      icon: profileIcon,
    },
    {
      title: t("security_settings_title"),
      description: t("security_settings_desc"),
      buttonText: t("account_settings_btn", { ns: "common" }),
      url: "/account-settings",
      icon: securityIcon,
    },
    {
      title: t("billing_history_title"),
      description: t("billing_history_desc"),
      buttonText: t("account_history_btn", { ns: "common" }),
      url: "/invoices",
      icon: billingIcon,
    },
    {
      title: t("account_reports_title"),
      description: t("account_reports_desc"),
      buttonText: t("manage_subscriptions_btn", { ns: "common" }),
      url: "/projects",
      icon: accountIcon,
    },
  ];

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3" style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>
                {t("welcome_user", { user: user.name })}
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>{t("welcome_message")}</p>
              </BlockDes>
            </BlockHeadContent>
            {/* <BlockHeadContent>
       <div className="toggle-wrap nk-block-tools-toggle">
        <Button
         className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
         onClick={() => updateSm(!sm)}
        >
         <Icon name="more-v" />
        </Button>
        <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
         <ul className="nk-block-tools g-3">
          <li>
           <UncontrolledDropdown>
            <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
             <Icon className="d-none d-sm-inline" name="calender-date" />
             <span>
              <span className="d-none d-md-inline">Last</span> 30 Days
             </span>
             <Icon className="dd-indc" name="chevron-right" />
            </DropdownToggle>
            <DropdownMenu right>
             <ul className="link-list-opt no-bdr">
              <li>
               <DropdownItem
                tag="a"
                onClick={(ev) => {
                 ev.preventDefault();
                }}
                href="#!"
               >
                <span>Last 30 days</span>
               </DropdownItem>
              </li>
              <li>
               <DropdownItem
                tag="a"
                onClick={(ev) => {
                 ev.preventDefault();
                }}
                href="#dropdownitem"
               >
                <span>Last 6 months</span>
               </DropdownItem>
              </li>
              <li>
               <DropdownItem
                tag="a"
                onClick={(ev) => {
                 ev.preventDefault();
                }}
                href="#dropdownitem"
               >
                <span>Last 3 weeks</span>
               </DropdownItem>
              </li>
             </ul>
            </DropdownMenu>
           </UncontrolledDropdown>
          </li>
          <li className="nk-block-tools-opt">
           <Button color="primary">
            <Icon name="reports" />
            <span>Reports</span>
           </Button>
          </li>
         </ul>
        </div>
       </div>
      </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row>
            {cardsData.map((data, i) => {
              return (
                <Col sm="6" key={i}>
                  <div className="card card-bordered">
                    <div className="card-body">
                      <div className="g-gs" style={{ display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
                        <Col sm="3">{data.icon}</Col>
                        <Col sm="9">
                          <h5 className="card-title" style={{textAlign:i18n.language==="ar"?'right':'left'}}>{data.title}</h5>
                          <p className="card-text" style={{textAlign:i18n.language==="ar"?'right':'left'}}>{data.description}</p>
                        </Col>
                      </div>
                    </div>
                    <Link to={data.url}>
                      <Button outline color="light" style={{ width: "100%",textAlign:"right" }}>
                        <p style={{ paddingTop: "15px", paddingBottom: "15px" ,marginLeft: i18n.language === "ar" ? "auto" : "0px"}}>{data.buttonText}</p>
                      </Button>
                    </Link>
                  </div>
                  {i === 1 && <br />}
                </Col>
              );
            })}
          </Row>

          <br />
          <br />
          <br />
          <PreviewCard>
            <div className="align-center flex-wrap flex-md-nowrap g-4" style={{flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
              <div className="nk-block-image w-120px flex-shrink-0">{supportIcon}</div>
              <BlockContent>
                <div className="nk-block-content-head px-lg-4">
                  <h5>{t("help_title")}</h5>
                  <p className="text-soft">{t("help_desc")}</p>
                </div>
              </BlockContent>
              <BlockContent className="flex-shrink-0">
                <Button color="white" outline className="btn-outline-primary btn-dim">
                  {t("get_support_btn", { ns: "common" })}
                </Button>
              </BlockContent>
            </div>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

const mapStateToProps = ({ user }) => ({
  user: user,
});

export default withRouter(connect(mapStateToProps)(Dashboard));
