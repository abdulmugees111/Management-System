import React, { useState, useEffect, useRef } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link, Redirect } from "react-router-dom";

import { Button, Card, Col, FormGroup, Row, Spinner } from "reactstrap";
import { BlockHeadContent, BlockTitle, BlockHead, Block, RSelect } from "../../../components/Component";
import { useLocation } from "react-router-dom";
import { pricingTableDataV2 } from "./data";
import { useQuery } from "@tanstack/react-query";
import { getPricings, getStripeSession } from "../../../services/order";
import { PlansReFormattor } from "../../../utils/formattors";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const OrderPage = ({ history }) => {
  const { t, i18n } = useTranslation(["order", "common", "pricing", "notification"]);
  let location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    price: state?.planPrice || 0,
    plan: {
      value: state?.planID ? state.planID : -1,
      label: state?.planName ? translatePlan(state.planName) : t("select_plan", { ns: "order" }),
    },
    address: "",
    payment_method: { value: -1, label: "" },
  });

  useEffect(()=>{},[i18n.language])

  const { data, isLoading } = useQuery(["get-pricings"], getPricings);
  const { isFetching, refetch } = useQuery(
    ["get-stripe-session", formData.plan.value],
    () => getStripeSession(formData.plan.value),
    {
      enabled: false,
      onSuccess: (data) => {
        // history.push(data.redirect_url)
        window.location.replace(data.redirect_url);
        if (!data) {
          toast.error(t("processing_request_error_nt", { ns: "notification" }));
        }
      },
      onError: () => toast.error(t("processing_request_error_nt", { ns: "notification" })),
    }
  );

  const payment_methods = [
    { value: 1, label: t("wire_transfer") },
    { value: 2, label: t("stripe") },
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.plan.value > 0) {
      refetch();
    }
  };

  function translatePlan(plan) {
    console.log("Plan to change")
    if (plan === "Tajr Basic Plan" ||plan ==="تاجر الخطة الأساسية") {
      console.log("Plan transform BASIC", plan);
      return t("basic_plan_title", { ns: "pricing" });
    } else if (plan === "Tajr Pro Plan"|| plan==="خطة التاجر المهنية") {
      console.log("Plan transform PRO", plan);
      return t("basic_pro_title", { ns: "pricing" });
    } else if (plan === "Tajr Enterprise Plan"||plan==="خطة مؤسسة التاجر") {
      return t("basic_enterprise_title", { ns: "pricing" });
    } else return plan;
  }
  function translatePlanArray(planArr) {
    console.log("Plan Arr", planArr);

    planArr.records.map((each) => {
      if (each.name === "Tajr Basic Plan" ||each.name ==="تاجر الخطة الأساسية") {
        console.log("Plan transform BASIC", each.name);
        each.name = t("basic_plan_title", { ns: "pricing" });
      }
      if (each.name  === "Tajr Pro Plan"|| each.name==="خطة التاجر المهنية") {
        console.log("Plan transform PRO", each.name);
        each.name = t("pro_plan_title", { ns: "pricing" });
      }
      if (each.name === "Tajr Enterprise Plan"||each.name==="خطة مؤسسة التاجر") {
        each.name = t("basic_enterprise_title", { ns: "pricing" });
      }
    });
    return planArr;
  }

  return (
    <React.Fragment>
      <Head title="Order" />
      <BlockHead style={{ display: "flex", flexDirection: i18n.language === "ar" ? "row-reverse" : "row" }}>
        <BlockHeadContent>
          <BlockTitle tag="h3" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>{t("order_title")}</BlockTitle>
        </BlockHeadContent>
      </BlockHead>

      <Block>
        <form onSubmit={submitHandler}>
          <Row className="g-gs" style={{ display: "flex", flexDirection: i18n.language === "ar" ? "row-reverse" : "row" }} >
            <Col lg="7">
              <Card
                className="card-bordered product-card px-2 py-3 "
                style={{ overflow: "visible", background: "#fcfcfc" }}
              >
                <h5 className="py-2 title" style={{ textAlign: i18n.language === "ar" ? 'right' : 'left' }}>{t("product_info")}</h5>
                <label className="form-label" htmlFor="plan" style={{ textAlign: i18n.language === "ar" ? 'right' : 'left' }}>
                  {t("your_plan")}:
                </label>

                <RSelect
                  style={{ direction: i18n.language === "ar" ? 'rtl' : 'ltr' }}
                  options={PlansReFormattor(!isLoading ? translatePlanArray(data) : [])}
                  defaultValue={{
                    value: state?.planID ? state.planID : -1,
                    label: state?.planName ? translatePlan(state.planName) : t("select_plan", { ns: "order" }),
                  }}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      plan: { value: e.value, label: translatePlan(e.label) },
                      price: e.price,
                    })
                  }
                />

                {/* <li className="divider"></li>
                <h5 className="py-2 title">Address info</h5>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="address">
                      Mailing address:
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <textarea
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      className="form-control-lg form-control"
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    <span className="invalid">This feild is required</span>
                  </div>
                </FormGroup> */}
                <li className="divider"></li>
                <h5 className="py-2 title" style={{ textAlign: i18n.language === "ar" ? 'right' : 'left' }}>{t("payment_info")}</h5>
                <label className="form-label" htmlFor="payment" style={{ textAlign: i18n.language === "ar" ? 'right' : 'left' }}>
                  {t("select_payment_method")}:
                </label>

                <RSelect
                  options={payment_methods}
                  defaultValue={{ value: -1, label: t("select_payment_method", { ns: "order" }) }}
                  onChange={(e) => setFormData({ ...formData, payment_method: { value: e.value, label: e.label } })}
                />
              </Card>
              <br />
            </Col>
            <Col xl="4" lg="5" className="offset-xl-1">
              <Card
                className="card-bordered product-card px-2 py-3 "
                style={{
                  overflow: "visible",
                  height: "fit-content",
                  background: "#fcfcfc",
                }}
              >
                <h5 className=" title" style={{ textAlign: i18n.language === "ar" ? 'right' : 'left' }}>{t("order_total")}</h5>
                <li className="divider" style={{ marginTop: "10px" }}></li>
                <div style={{ display: "flex", justifyContent: "space-between",flexDirection:i18n.language==="ar"?"row-reverse":"row" }} className="px-2">
                  <label className=" form-label">{t("sub_total")}:</label>
                  <label className=" form-label">${formData.price}</label>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between",flexDirection:i18n.language==="ar"?"row-reverse":"row" }} className="px-2">
                  <label className=" form-label">{t("taxes")}:</label>
                  <label className=" form-label">$0</label>
                </div>
                <li className="divider"></li>
                <div style={{ display: "flex", justifyContent: "space-between",flexDirection:i18n.language==="ar"?"row-reverse":"row" }} className="px-2">
                  <label className=" form-label">{t("total")}:</label>
                  <label className=" form-label">${formData.price}</label>
                </div>

                <Button size="lg" className="btn-block mt-3" color="primary" type="submit">
                  {isFetching ? (
                    <Spinner size={"sm"} color="white" />
                  ) : (
                    <span>{t("proceed_payment_btn", { ns: "common" })}</span>
                  )}
                </Button>
              </Card>
            </Col>
          </Row>
        </form>
      </Block>
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

export default OrderPage;
