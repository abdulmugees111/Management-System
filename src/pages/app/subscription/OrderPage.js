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
  const {t}=useTranslation(['order','common','pricing'])
  let location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    price: state?.planPrice || 0,
    plan: {
      value: state?.planID ? state.planID : -1,
      label: state?.planName ? state.planName : t("select_plan"),
    },
    address: "",
    payment_method: { value: -1, label: "" },
  });

  const { data, isLoading } = useQuery(["get-pricings"], getPricings);
  const {
    isFetching,
    refetch,
  } = useQuery(["get-stripe-session", formData.plan.value], () => getStripeSession(formData.plan.value), {
    enabled: false,
    onSuccess: (data) => {
      // history.push(data.redirect_url)
      window.location.replace(data.redirect_url);
      if (!data) {
        toast.error("Error occurred while processing your request");
      }
    },
    onError: () => toast.error("Error occurred while processing your request"),
  });

  const payment_methods = [
    { value: 1, label: t("wire_transfer")},
    { value: 2, label:  t("stripe") },
  ];


  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.plan.value > 0) {
      refetch();
    }
  };


  return (
    <React.Fragment>
      <Head title="Order" />
      <BlockHead>
        <BlockHeadContent>
          <BlockTitle tag="h3">{ t("order_title")}</BlockTitle>
        </BlockHeadContent>
      </BlockHead>

      <Block>
        <form onSubmit={submitHandler}>
          <Row className="g-gs">
            <Col lg="7">
              <Card
                className="card-bordered product-card px-2 py-3 "
                style={{ overflow: "visible", background: "#fcfcfc" }}
              >
                <h5 className="py-2 title">{ t("product_info")}</h5>
                <label className="form-label" htmlFor="plan">
                { t("your_plan")}:
                </label>

                <RSelect
                  options={PlansReFormattor(!isLoading ? data : [])}
                  defaultValue={{
                    value: state?.planID ? state.planID : -1,
                    label: state?.planName ? state.planName : t("select_plan"),
                  }}
                  onChange={(e) => 
                    setFormData({
                      ...formData,
                      plan: { value: e.value, label: e.label },
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
                <h5 className="py-2 title">{t("payment_info")}</h5>
                <label className="form-label" htmlFor="payment">
                {t("select_payment_method")}:
                </label>

                <RSelect
                  options={payment_methods}
                  defaultValue={{ value: -1, label: t("select_payment_method") }}
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
                <h5 className=" title">{t("order_total")}</h5>
                <li className="divider" style={{ marginTop: "10px" }}></li>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="px-2">
                  <label className=" form-label">{t("sub_total")}:</label>
                  <label className=" form-label">${formData.price}</label>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="px-2">
                  <label className=" form-label">{t("taxes")}:</label>
                  <label className=" form-label">$0</label>
                </div>
                <li className="divider"></li>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="px-2">
                  <label className=" form-label">{t("total")}:</label>
                  <label className=" form-label">${formData.price}</label>
                </div>

                <Button size="lg" className="btn-block mt-3" color="primary" type="submit">
                  {isFetching ? <Spinner size={"sm"} color="white" /> : <span>Proceed payment</span>}
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
