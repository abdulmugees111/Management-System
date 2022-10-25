import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Link } from "react-router-dom";
import { Stepper, Step } from "react-form-stepper";
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

const OrderPage = ({ match }) => {
const opts = [
  { value: "Starter", label: "Starter" },
  { value: "Pro", label: "Pro" },
  { value: "Enterprise", label: "Enterprise" },
];
const submitHandler = (e) =>{
e.preventDefault()
}
  return (
    <React.Fragment>
      <Head title="Order"></Head>
      {/* <Content size="lg"> */}
      <BlockHead>
        <BlockHeadContent></BlockHeadContent>
      </BlockHead>

      <Block>
        <form onSubmit={submitHandler}>
          <Row className="g-gs">
            <Col lg="7">
              <Card
                className="card-bordered product-card px-2 py-3 "
                style={{ minHeight: "25rem", overflow: "visible" }}
              >
                <h5 className="py-2 title">Product info</h5>
                <label className="form-label" htmlFor="address">
                  Your plan
                </label>
                <RSelect
                  options={opts}
                  defaultValue={{ value: "Starter", label: "Starter" }}
                  // onChange={(e) => setFormData({ ...formData, status: e.value })}
                />

                <li className="divider"></li>

                <h5 className="py-2 title">Address info</h5>

                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="address">
                      Mailing address
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
                <label className="form-label" htmlFor="address">
                  Select payment method
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
                  minHeight: "25rem",
                  overflow: "visible",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
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
                </div>

                <div style={{ background: "red" }}>
                  <Button size="lg" className="btn-block" color="primary" type="submit">
                    Process checkout
                  </Button>
                </div>
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
