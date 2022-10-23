import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Badge, Button } from "reactstrap";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,
} from "../../../components/Component";
import { Card } from "reactstrap";

const PricingTable = () => {
  return (
    <React.Fragment>
      <Head title="Tajr Pricing"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween className="g-3">
            <BlockContent>
              <BlockTitle>Pricing Table</BlockTitle>
              <BlockDes className="text-soft">
                <p>Choose your pricing plan and start enjoying our service.</p>
              </BlockDes>
            </BlockContent>
          </BlockBetween>
        </BlockHead>

        <Block size="lg">
          <BlockHead>
            <BlockBetween className="g-3">
              <BlockContent>
                <BlockTitle>Pricing Table V2</BlockTitle>
                <BlockDes className="text-soft">
                  <p>Choose your pricing plan and start enjoying our service.</p>
                </BlockDes>
              </BlockContent>
            </BlockBetween>
          </BlockHead>
          <Row className="g-gs">
            {{}.map((item) => {
              return (
                <Col md={6} key={item.id}>
                  <Card className={`card-bordered pricing text-center ${item.tags ? "recommend" : ""}`}>
                    {item.tags && (
                      <Badge color="primary" className="pricing-badge">
                        Recommend
                      </Badge>
                    )}
                    <div className="pricing-body">
                      <div className="pricing-media">
                        <img src={item.logo} alt="" />
                      </div>
                      <div className="pricing-title w-220px mx-auto">
                        <h5 className="title">{item.title}</h5>
                        <span className="sub-text">{item.desc}</span>
                      </div>
                      <div className="pricing-amount">
                        <div className="amount">
                          ${item.amount} <span>/yr</span>
                        </div>
                        <span className="bill">{item.userNumber} User, Billed Yearly</span>
                      </div>
                      <div className="pricing-action">
                        <Button color="primary">Select Plan</Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default PricingTable;
