import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { BlockHeadContent, BlockTitle, BlockHead, Block, RSelect } from "../../../components/Component";
import { useLocation } from "react-router-dom";
import { pricingTableDataV2 } from "./data";
const OrderPage = () => {
  let location = useLocation();
  const { state } = location;

  const [formData, setFormData] = useState({
    plan: {
      value: state?.planID ? state.planID : 0,
      label: state?.planName ? state.planName : "Starter - $99/yr",
    },
    address: "",
    payment_method: { value: "", label: "" },
  });
  const opts = [
    { value: 1, label: `Starter - $99/yr` },
    { value: 2, label: `Pro - $299/yr` },
    { value: 3, label: `Enterprise - $599/yr` },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ formData });
  };
  return (
    <React.Fragment>
      <Head title="Order"></Head>
      {/* <Content size="lg"> */}
      <BlockHead>
        <BlockHeadContent>
          <BlockTitle tag="h3">Ready to get started</BlockTitle>
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
                <h5 className="py-2 title">Product info</h5>
                <label className="form-label" htmlFor="plan">
                  Your plan:
                </label>
                <RSelect
                  options={opts}
                  defaultValue={{
                    value: state?.planID ? state.planID : 0,
                    label: state?.planName ? state.planName : "Starter - $99/yr",
                  }}
                  onChange={(e) => setFormData({ ...formData, plan: { value: e.value, label: e.label } })}
                />

                <li className="divider"></li>

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
                  </div>
                </FormGroup>
                <li className="divider"></li>

                <h5 className="py-2 title">Payment info</h5>
                <label className="form-label" htmlFor="payment">
                  Select payment method:
                </label>
                <RSelect
                  options={opts}
                  defaultValue={{ value: "Starter", label: "Starter" }}
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
                  // display: "flex",
                  // flexDirection: "column",
                  // justifyContent: "space-between",
                  height: "fit-content",
                  background: "#fcfcfc",
                }}
              >
                <h5 className=" title">Order Total</h5>
                <li className="divider" style={{ marginTop: "10px" }}></li>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="px-2">
                  <label className=" form-label">Sub total:</label>
                  <label className=" form-label">$300</label>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="px-2">
                  <label className=" form-label">Taxes:</label>
                  <label className=" form-label">$300</label>
                </div>
                <li className="divider"></li>
                <div style={{ display: "flex", justifyContent: "space-between" }} className="px-2">
                  <label className=" form-label">Total:</label>
                  <label className=" form-label">$600</label>
                </div>

                <Button size="lg" className="btn-block mt-3" color="primary" type="submit">
                  Process checkout
                </Button>
              </Card>
            </Col>
          </Row>
        </form>
      </Block>
      {/* </Content> */}
    </React.Fragment>
  );
};

export default OrderPage;
