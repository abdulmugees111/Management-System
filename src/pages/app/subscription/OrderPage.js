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
import {
  BlockHeadContent,
  BlockTitle,
  BlockHead,
  Block,
  RSelect,
} from "../../../components/Component";
import { useLocation } from "react-router-dom";
const OrderPage = () => {
  let location = useLocation();
  const { state } = location;

const opts = [
  { value: "1", label: "Starter" },
  { value: "2", label: "Pro" },
  { value: "3", label: "Enterprise" },
];


const submitHandler = (e) =>{
e.preventDefault()
}
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
                  defaultValue={{ value: state.planID, label: state.planName }}
                  // onChange={(e) => setFormData({ ...formData, status: e.value })}
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
                    />
                    {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
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
                  // onChange={(e) => setFormData({ ...formData, status: e.value })}
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
