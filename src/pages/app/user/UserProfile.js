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
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const {t,i18n}=useTranslation(['common','notification'])
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
    onError: () => toast.error(t('processing_request_error_nt',{ns:'notification'})),
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
          toast.success(t('profile_updated_nt',{ns:'notification'}));
        } else {
          toast.error(t('processing_request_error_nt',{ns:'notification'}));
        }
      },
      onError: () => toast.error(t('processing_request_error_nt',{ns:'notification'})),
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
  };

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <React.Fragment>
      <Head title="User List - Profile"></Head>
      <BlockHead size="lg" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}} >
        <BlockBetween >
          <BlockHeadContent >
            <BlockTitle tag="h4" style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{t('personal_information')} </BlockTitle>
            <BlockDes >
              <p>{t('personal_information_desc')}</p>
            </BlockDes>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>
      {/* style={{flexDirection: i18n.language === "ar" ? "row-reverse" : "row",marginLeft: i18n.language === "ar" ? "auto" : "0px",justifyContent: i18n.language === "ar" ? "flex-end" : "flex-start"}} */}
      <Block>
        <div className="nk-data data-list data-list-s2">
          <div className="data-head" >
            <h6 className="overline-title" style={{marginLeft: i18n.language === "ar" ? "auto" : "0px",width:"fit-content"}}>{t('basics')}</h6>
          </div>
          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}} onClick={() => setModal(true)}>
            <div className="data-col" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row",justifyContent:"space-between"}}>
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('full_name')}</span>
              <span className="data-value">{data.name}</span>
            </div>
            <div className="data-col data-col-end" >
              <span className="data-more"style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}>
                <Icon name={i18n.language==="ar"?"back-ios":"forward-ios"}></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}}>
            <div className="data-col" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row",justifyContent:"space-between"}}>
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('email')}</span>
              <span className="data-value">{data.email}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more disable" style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}>
                <Icon name="lock-alt"></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}} onClick={() => setModal(true)}>
            <div className="data-col" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row",justifyContent:"space-between"}}>
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('pno')}</span>
              <span className="data-value text-soft">{data.phone}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more" style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}>
                <Icon name={i18n.language==="ar"?"back-ios":"forward-ios"}></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}} onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('company_name')}</span>
              <span className="data-value text-soft">{data.company_name}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more" style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}>
                <Icon name={i18n.language==="ar"?"back-ios":"forward-ios"}></Icon>
              </span>
            </div>
          </div>
          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}} onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('vat')}</span>
              <span className="data-value text-soft">{data.vat}</span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more" style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}>
                <Icon name={i18n.language==="ar"?"back-ios":"forward-ios"}></Icon>
              </span>
            </div>
          </div>

          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}} onClick={() => setModal(true)}>
            <div className="data-col">
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('address')}</span>
              <span className="data-value">
                {data.street},
                <br />
                {data.zip}, {data.city}, {data.country_id ? data.country_id.name : ""}
              </span>
            </div>
            <div className="data-col data-col-end">
              <span className="data-more" style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}>
                <Icon name={i18n.language==="ar"?"back-ios":"forward-ios"}></Icon>
              </span>
            </div>
          </div>
        </div>
        <div className="nk-data data-list data-list-s2">
          <div className="data-head">
            <h6 className="overline-title" style={{marginLeft: i18n.language === "ar" ? "auto" : "0px",width:"fit-content"}}>{t('preferences')} </h6>
          </div>
          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}}>
            <div className="data-col" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row",justifyContent:"space-between"}}>
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('language')}</span>
              <span className="data-value" style={{margin:"0px 10px"}}>English (United State)</span>
            </div>
            <div className="data-col data-col-end" >
              <a
                href="#language"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
                className="link link-primary"
                style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}
              >
                {t('change_lang_btn')}
              </a>
            </div>
          </div>
          <div className="data-item" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}}>
            <div className="data-col" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row",justifyContent:"space-between"}}>
              <span className="data-label" style={{marginLeft: i18n.language === "ar" ? "auto":"0px",width:"fit-content"}}>{t('date_format')}</span>
              <span className="data-value" style={{margin:"0px 10px"}}>MM/DD/YYYY</span>
            </div>
            <div className="data-col data-col-end">
              <a
                href="#link"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
                className="link link-primary"
                style={{marginRight: i18n.language === "ar" ? "auto":"0px"}}
              >
                {t('change_btn')}
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
            <h5 className="title">{t('update_profile')}</h5>
            <br />

            <div className="tab-content">
              <div className={`tab-pane active`} id="personal">
                <Row className="gy-4">
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="full-name">
                      {t('full_name')}
                      </label>
                      <input
                        type="text"
                        id="full-name"
                        className="form-control"
                        name="name"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.name}
                        placeholder={t('full_name')}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="company-name">
                      {t('company_name')}
                      </label>
                      <input
                        required
                        type="text"
                        id="company-name"
                        className="form-control"
                        name="company_name"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.company_name}
                        placeholder={t('company_name')}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="phone-no">
                      {t('pno')}
                      </label>
                      <input
                        required
                        type="number"
                        id="phone-no"
                        className="form-control"
                        name="phone"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.phone}
                        placeholder={t('pno')}
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
                      {t('street')}
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.street}
                        className="form-control"
                        placeholder={t('street')}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="email">
                      {t('email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e) => onInputChange(e)}
                        defaultValue={formData.email}
                        className="form-control"
                        placeholder={t('email')}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <label className="form-label" htmlFor="address-county">
                      {t('country')}
                      </label>
                      <RSelect
                        options={countriesList ? reFormat(countriesList) : []}
                        placeholder={t('country')}
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
                      {t('state')}
                      </label>
                      <RSelect
                        options={statesList ? reFormat(statesList) : []}
                        placeholder={t('state')}
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
                          {updateDataLoading ? <Spinner size="sm" color="light" /> : t('update_profile')}
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
                         {t('cancel_btn')}
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
