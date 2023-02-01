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
import { pricingTableDataV2 } from "./data";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPricings } from "../../../services/order/index";
import { useTranslation } from "react-i18next";

const PricingTable = () => {
  const { t ,i18n} = useTranslation(["pricing",'common']);
  function translatePlan(plan) {
    console.log("Plan to change")
    if (plan === "Idara Basic Plan") {
      console.log("Plan transform BASIC", plan);
      return t("basic_plan_title", { ns: "pricing" });
    } else if (plan === "Idara Pro Plan") {
      console.log("Plan transform PRO", plan);
      return t("pro_plan_title", { ns: "pricing" });
    } else if (plan === "Idara Enterprise Plan") {
      return t("basic_enterprise_title", { ns: "pricing" });
    } else return plan;
  }

  const { data, isLoading } = useQuery(["get-pricings"], getPricings);

  return (
    <React.Fragment>
      <Head title="Pricing"></Head>
      <Content>
        <BlockHead size="sm" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
          <BlockBetween className="g-3">
            <BlockContent>
              <BlockTitle style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{t("pricing_title")}</BlockTitle>
              <BlockDes className="text-soft">
                <p>{t("pricing_desc")}</p>
              </BlockDes>
            </BlockContent>
          </BlockBetween>
        </BlockHead>

        <Block size="lg">
          <Row className="g-gs" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
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
                        <h5 className="title">
                          {item.name === "Idara Basic Plan"
                            ? t("basic_plan_title")
                            : item.name === "Idara Pro Plan"
                            ? t("pro_plan_title")
                            : item.name === "Idara Enterprise Plan"
                            ? t("basic_enterprise_title")
                            : null}
                        </h5>
                        <span className="sub-text">{item.desc}</span>
                      </div>
                      <div className="pricing-amount">
                        <div className="amount">
                          ${item.year_price} <span>/{t('year',{ns:"common"})}</span>
                        </div>
                        <span className="bill"> {t("billed_yearly")}</span>
                      </div>
                      <div className="pricing-action">
                        <Link
                          to={{
                            pathname: "/order",
                            state: { planID: item.id, planName: translatePlan(item.name), planPrice: item.year_price },
                          }}
                        >
                          <Button color="primary">{t("select_pricing_btn",{ns:'common'})}</Button>
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
