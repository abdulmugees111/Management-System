import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle
} from "../../../components/block/Block";
import { Button, Col, Icon, Row } from "../../../components/Component";

const mapStateToProps = ({ domain }) => ({
  domain
});

const Domain = ({ domain }) => {
  const [sm, updateSm] = useState(false);

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                My Subscription
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>cancel or renew your subscription</p>
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

