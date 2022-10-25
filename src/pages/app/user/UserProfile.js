import React, { useState } from "react";
import Head from "../../../layout/head/Head";

import { Spinner, Modal, ModalBody, FormGroup } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  Button,
  RSelect,
} from "../../../components/Component";
import { countryOptions, userData } from "./UserData";
import { getDateStructured } from "../../../utils/Utils";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { get_countries, get_states, get_user_data, update_user_data } from "../../../services/user/index";
import { reFormat } from "../../../utils/formattors";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    vat: "",
    email: "",
    country_id: [],
    state_id: [],
  });

  const {
    isLoading,
    error,
    data,
    refetch: getUserRefetch,
  } = useQuery(["get-user-data"], get_user_data, {
    onSuccess: (data) => {
      if (data) {
        setFormData({
          ...(delete data.id && data),
        });
      }
    },
    onError: () => toast.error("Error occured while processing your request"),
  });

  const { isFetching: updateDataLoading, refetch: updateUser } = useQuery(
    ["update-user-data"],
    () => update_user_data(formData),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data) {
          setModal(false);
          getUserRefetch();
          toast.success("Profile successfully updated");
        } else {
          toast.error("Error processing your request");
        }
      },
      onError: () => toast.error("Error processing your request"),
    }
  );

  const { data: countriesList } = useQuery(["get-countries"], get_countries);
  const { data: statesList } = useQuery(["get-states", formData.country_id[0]], () =>
    get_states(formData.country_id[0])
  );

  const [modal, setModal] = useState(false);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    // let submitData = {
    //   ...formData,
    // };
    // setUserInfo(submitData);
    updateUser();
    console.log({ formData });
  };

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <BlockHead size="lg">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle tag="h4">Personal Information</BlockTitle>
            <BlockDes>
              <p>Basic info, like your name and address, that you use on Nio Platform.</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <Block>
        <div className="nk-data data-list data-list-s2">
          <div className="data-head">
            <h6 className="overline-title">Basics</h6>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Full Name</span>
              <span className="data-value">{data.name}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item">
            <div className="data-col">
              <span className="data-label">Email</span>
              <span className="data-value">{data.email}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more disable">
                <Icon name="lock-alt"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Phone Number</span>
              <span className="data-value text-soft">{data.phone}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Company Name</span>
              <span className="data-value text-soft">{data.company_name}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">VAT</span>
              <span className="data-value text-soft">{data.vat}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
            </div>
          </div>

          <div className="data-item" onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label">Address</span>
              <span className="data-value">
                {data.street},
                <br />
                {data.zip}, {data.city}, {data.country_id ? data.country_id.name : ""}
              </span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more">
                <Icon name="forward-ios"></Icon>
              </span>
            </div>
          </div>
        </div>
        <div className="nk-data data-list data-list-s2">
          <div className="data-head">
            <h6 className="overline-title">Preferences</h6>
          </div>
          <div className="data-item">
            <div className="data-col">
              <span className="data-label">Language</span>
              <span className="data-value">English (United State)</span>
            </div>
            <div className="data-col data-col-end">
              <a
                href="#language"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
                className="link link-primary"
              >
                Change Language
              </a>
            </div>
          </div>
          <div className="data-item">
            <div className="data-col">
              <span className="data-label">Date Format</span>
              <span className="data-value">MM/DD/YYYY</span>
            </div>
            <div className="data-col data-col-end">
              <a
                href="#link"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
                className="link link-primary"
              >
                Change
              </a>
            </div>
          </div>
        </div>
      </Block>

      <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ModalBody>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Update Profile</h5>
            <br />

            <div className="tab-content">
              <div className={`tab-pane active`} id="personal">
                <Row className="gy-4">
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        className="form-control"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.name}
                        placeholder="Enter Full name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="company-name">
                        Company Name
                      </label>
                      <input
                        required
                        type="text"
                        id="company-name"
                        className="form-control"
                        name="company_name"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.company_name}
                        placeholder="Enter Company name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="phone-no">
                        Phone Number
                      </label>
                      <input
                        required
                        type="number"
                        id="phone-no"
                        className="form-control"
                        name="phone"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.phone}
                        placeholder="Phone Number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="vat">
                        VAT
                      </label>
                      <input
                        required
                        type="number"
                        id="vat"
                        className="form-control"
                        name="vat"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.vat}
                        placeholder="VAT"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="street">
                        Street
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.street}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.email}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-county">
                        Country
                      </label>
                      <RSelect
                        options={countriesList ? reFormat(countriesList) : []}
                        placeholder="Select a country"
                        defaultValue={[
                          {
                            value: formData.country_id[0],
                            label: formData.country_id[1],
                          },
                        ]}
                        onChange={(e) => setFormData({ ...formData, country_id: [e.value, e.label] })}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-st">
                        State
                      </label>
                      <RSelect
                        options={statesList ? reFormat(statesList) : []}
                        placeholder="Select a state"
                        defaultValue={[
                          {
                            value: formData.state_id[0],
                            label: formData.state_id[1],
                          },
                        ]}
                        onChange={(e) => setFormData({ ...formData, state_id: [e.value, e.label] })}
                      />
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button
                          color="primary"
                          size="lg"
                          onClick={(ev) => {
                            ev.preventDefault();
                            submitForm();
                          }}
                        >
                          {updateDataLoading ? <Spinner size="sm" color="light" /> : "Update Profile"}
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setModal(false);
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
const mapStateToProps = ({ user, dispatch }) => ({
  user: user,
});

export default withRouter(connect(mapStateToProps)(UserProfile));
