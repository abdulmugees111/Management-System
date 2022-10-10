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
import { profileIcon, accountIcon, billingIcon, securityIcon, supportIcon } from './components/svgIcons';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Dashboard = ({ user }) => {
 const [sm, updateSm] = useState(false);

 const cardsData = [
  {
   title: "Personal Info",
   description: "See your profile data and manage your Account to choose what is saved in our system.",
   buttonText: "Manage Your Account",
   url: "#",
   icon: profileIcon
  },
  {
   title: "Security Setting",
   description: "You have full control to manage your own account and keep account fully secure.",
   buttonText: "Account Setting",
   url: "#",
   icon: securityIcon
  },
  {
   title: "Billing History",
   description: "Check out all your payment history. You can also download or print your invoice.",
   buttonText: "Account History"
   , url: "",
   icon:
    billingIcon
  },
  {
   title: "Account Reports",
   description: "Check your reports of uses and manage your packages or subscriptions that you have.",
   buttonText: "Manage Subscription",
   url: "",
   icon: accountIcon
  },
 ]

 return (
  <React.Fragment>
   <Head title="Homepage"></Head>
   <Content>
    <BlockHead size="sm">
     <BlockBetween>
      <BlockHeadContent>
       <BlockTitle page tag="h3">
        Welcome, {user.name}
       </BlockTitle>
       <BlockDes className="text-soft">
        <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
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
      {
       cardsData.map((data, i) => {
        return (
         <Col sm="6" key={i}>
          <div className="card card-bordered">
           <div className="card-body">
            <Row className="g-gs">
             <Col sm="3">
              {data.icon}
             </Col>
             <Col sm="9">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{data.description}</p>
             </Col>
            </Row>
           </div>
           <Link to={data.url}>

            <Button outline color="light" style={{ width: '100%' }}>
             <p style={{ paddingTop: '15px', paddingBottom: '15px' }}>
              {data.buttonText}
             </p>
            </Button>
           </Link>
          </div>
          {
           i === 1 && <br />
          }
         </Col>
        )
       })
      }
     </Row>

     <br />
     <br />
     <br />
     <PreviewCard>
      <div className="align-center flex-wrap flex-md-nowrap g-4">
       <div className="nk-block-image w-120px flex-shrink-0">
        {supportIcon}
       </div>
       <BlockContent>
        <div className="nk-block-content-head px-lg-4">
         <h5>We’re here to help you!</h5>
         <p className="text-soft">
          Ask a question or file a support ticket, manage request, report an issues. Our support team will
          get back to you by email.
         </p>
        </div>
       </BlockContent>
       <BlockContent className="flex-shrink-0">
        <Button color="white" outline className="btn-outline-primary btn-dim">
         Get Support Now
        </Button>
       </BlockContent>
      </div>
     </PreviewCard>

    </Block>
   </Content>
  </React.Fragment>
 );
};

const mapStateToProps = ({ user, }) => ({
 user: user,
});

export default withRouter(connect(mapStateToProps)(Dashboard));
