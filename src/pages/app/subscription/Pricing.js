import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Badge, Button } from "reactstrap";
import PlanS1 from "../../../images/icons/plan-s1.svg";
import PlanS2 from "../../../images/icons/plan-s2.svg";
import PlanS3 from "../../../images/icons/plan-s3.svg";
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
import {pricingTableDataV2} from './data'
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import {getPricings} from '../../../services/order/index'

const PricingTable = () => {

  const {data, isLoading} = useQuery(['get-pricings'],getPricings)
  
  return (
    <React.Fragment>
      <Head title="Pricing"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween className="g-3">
            <BlockContent>
              <BlockTitle>Tajr Pricing</BlockTitle>
              <BlockDes className="text-soft">
                <p>Choose your pricing plan and start enjoying our service.</p>
              </BlockDes>
            </BlockContent>
          </BlockBetween>
        </BlockHead>

        <Block size="lg">
          <Row className="g-gs">
            {data?.records?.map((item) => {
              return (
                <Col md={6} xl="4" key={item.id}>
                  <Card className={`card-bordered pricing text-center ${item.tags ? "recommend" : ""}`}>
                    {item.tags && (
                      <Badge color="primary" className="pricing-badge">
                        Recommend
                      </Badge>
                    )}
                    <div className="pricing-body">
                      <div className="pricing-media">
                        <img src={item.id === 1 ? PlanS1 : item.id === 2 ? PlanS2 : PlanS3} alt="" />
                      </div>
                      <div className="pricing-title w-220px mx-auto">
                        <h5 className="title">{item.name}</h5>
                        <span className="sub-text">{item.desc}</span>
                      </div>
                      <div className="pricing-amount">
                        <div className="amount">
                          ${item.year_price} <span>/yr</span>
                        </div>
                        <span className="bill"> Billed Yearly</span>
                      </div>
                      <div className="pricing-action">

                        <Link
                          to={{
                            pathname: "/order",
                            state: { planID: item.id, planName: item.name, planPrice: item.year_price },
                          }}
                        >
                          <Button color="primary">Select Plan</Button>
                        </Link>

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
