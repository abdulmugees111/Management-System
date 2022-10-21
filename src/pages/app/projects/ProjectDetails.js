import React, { useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
 Block,
 BlockDes,
 BlockHead,
 BlockHeadContent,
 BlockTitle,
 Icon,
 Button,
 BlockBetween,
 PreviewCard, BackTo
} from "../../../components/Component";
import { Row, Col, FormGroup, Spinner } from "reactstrap";
import { useQuery } from '@tanstack/react-query'

import { withRouter, useParams } from "react-router-dom";
import {getProject} from '../../../services/projects/index'


const ProjectDetails = () => {
 const { app_name } = useParams();

 const {
  isLoading,
  error,
  data
 } = useQuery(['get-project', app_name], () => getProject(app_name))

 const [sm, updateSm] = useState(false);

 return (
  <React.Fragment>
   <Head title="Homepage"></Head>
   <Content>
    <BlockHead size="sm">
     <BlockBetween>
      <BlockHeadContent>
       <BackTo link="/projects" icon="arrow-left">
        Subscriptions
       </BackTo>
       <BlockTitle page tag="h3">
        Subscription Overview
       </BlockTitle>
       <BlockDes className="text-soft">
        <p>Welcome to Tajr Portal</p>
       </BlockDes>
      </BlockHeadContent>
      <BlockHeadContent>
       <div className="toggle-wrap nk-block-tools-toggle">
        <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
         <ul className="nk-block-tools g-3">
          <li className="nk-block-tools-opt">
           <Button color="primary">
            <span>Connect</span>
            <Icon name="arrow-up-right" />
           </Button>
          </li>
         </ul>
        </div>
       </div>
      </BlockHeadContent>
     </BlockBetween>
    </BlockHead>
    {
      isLoading && <Spinner color="primary" />
    }
    {
      data !== undefined && data.count === 1 &&
      <Block>
       <PreviewCard>
        <Row className="g-4">
         <Col lg="6">
          <FormGroup className="form-group">
           <label className="form-label">
            Subscription Name
           </label>
           <div className="form-control-wrap">
            <input disabled value={data.results[0].name} type="text" className="form-control" />
           </div>
          </FormGroup>
         </Col>
         <Col lg="6">
          <FormGroup className="form-group">
           <label className="form-label">
            Subscription ID
           </label>
           <div className="form-control-wrap">
            <input disabled value={data.results[0].app_name} type="text" className="form-control" />
           </div>
          </FormGroup>
         </Col>
         <Col lg="6">
          <FormGroup className="form-group">
           <label className="form-label">
            Login Username
           </label>
           <div className="form-control-wrap">
            <input disabled value={data.results[0].login_email} type="text" className="form-control" />
           </div>
          </FormGroup>
         </Col>

        </Row>
       </PreviewCard>
      </Block>
    }
   </Content>
  </React.Fragment>
 );
};
export default withRouter(ProjectDetails);
