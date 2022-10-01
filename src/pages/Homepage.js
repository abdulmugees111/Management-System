import React, { useState } from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import {
  Block,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  BlockBetween,
} from "../components/Component";

import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";

const mapStateToProps = ({ project, dispatch }) => ({
  projects: project,
  dispatch: dispatch
});


const Homepage = ({project, dispatch}) => {
  const [sm, updateSm] = useState(false);
  let { id } = useParams();
  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                Instance Overview
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Idara Portal</p>
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
export default withRouter(connect(mapStateToProps)(Homepage));