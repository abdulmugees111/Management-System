import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import {
  BackTo,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle
} from "../../../../components/block/Block";
import { Button, Col, Icon, Row } from "../../../../components/Component";
import { useParams } from "react-router-dom";

const mapStateToProps = ({ domain }) => ({
  domain
});

const Domain = ({ domain }) => {
  const [sm, updateSm] = useState(false);
  const { app_name } = useParams();
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
                Subscription Settings
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Modify your Subscription</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col sm="6">
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(Domain);

