import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import DatePicker from "react-datepicker";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Card,
  FormGroup,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
  Badge,
} from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  PaginationComponent,
  Row,
  RSelect,
} from "../../../components/Component";
import { statusOptions, paymentData } from "./Invoice";
import { dateFormatterAlt } from "../../../utils/Utils";
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import { get_invoices } from "../../../services/invoice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Spinner} from "reactstrap";
import InvoiceForm from './testing-invoice'
const PaymentHistory = () => {

  const [userData, setUserData] = useState({
    old_password: "",
    password: "",
    confirm_password: "",
  });
  const [passState, setPassState] = useState(false);
  const [modal2, setModal2] = useState(false);
  // const { errors2, register2, handleSubmit2 } = useForm();
  const { t,i18n } = useTranslation(['invoices','account_settings','common','notification']);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    add: false,
  });
  const [viewModal, setViewModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [data, setData] = useState(paymentData);
  const [formData, setFormData] = useState({
    bill: "",
    issue: new Date(),
    due: new Date(),
    total: "",
    status: "",
    ref: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");

  const sortingFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = [...defaultData].sort((a, b) => parseFloat(a.ref) - parseFloat(b.ref));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = [...defaultData].sort((a, b) => parseFloat(b.ref) - parseFloat(a.ref));
      setData([...sortedData]);
    }
  };

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = paymentData.filter((item) => {
        return item.bill.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...paymentData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      bill: "",
      issue: new Date(),
      due: new Date(),
      total: "",
      status: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { bill, total } = submitData;
    
    let submittedData = {
      id: data.length + 1,
      ref: 4970 + data.length,
      bill: bill,
      issue: dateFormatterAlt(formData.issue, true),
      due: dateFormatterAlt(formData.due, true),
      total: total + ".00",
      status: formData.status,
    };
    setData([submittedData, ...data]);

    resetForm();
    setModal({ add: false });
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item.id === id);
    setDetail(data[index]);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  const { isLoading, error, data:invoices } = useQuery(["get-invoices"], get_invoices);
  return (
    <React.Fragment>
    <InvoiceForm/>


      <Head title={t('payment_history_title')}></Head>
      <Content>
            
        


        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              
              <div className="card-inner p-0">
                <table className="table table-tranx" style={{direction:i18n.language==="ar"?'rtl':'ltr'}}>
                  <thead>
                    <tr className="tb-tnx-head">
                      <th className="tb-tnx-id" style={{ textAlign: i18n.language==="ar"?"right":"left"}}>
                        <span className="">{t('name_table_field')}</span>
                      </th>
                      <th className="tb-tnx-info" style={{ textAlign: i18n.language==="ar"?"right":"left"}}>
                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                          <span>{t('payment_ref_table_field')}</span>
                        </span>
                        <span className="tb-tnx-date d-md-inline-block d-none">
                          <span className="d-none d-md-block">
                            <span>{t('invoice_date_table_field')}</span>
                          </span>
                        </span>
                      </th>
                      <th className="tb-tnx-amount is-alt" style={{ textAlign: i18n.language==="ar"?"right":"left"}}>
                        <span className="tb-tnx-status d-none d-md-inline-block">{t('state_table_field')}</span>
                      </th>
                      {/*<th className="tb-tnx-action">*/}
                      {/*  <span>&nbsp;</span>*/}
                      {/*</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices && invoices.count > 0
                      ? invoices.results.map((item) => {
                          return (
                            <tr key={item.id} className="tb-tnx-item">
                              <td className="tb-tnx-id">
                                <Link to={`/invoice/${item.id}`}>
                                  <span>{item.name}</span>
                                </Link>
                              </td>
                              <td className="tb-tnx-info">
                                <div className="tb-tnx-desc">
                                  <span className="title">{item.payment_reference}</span>
                                </div>
                                <div className="tb-tnx-date">
                                  <span className="date">{item.invoice_date}</span>
                                </div>
                              </td>
                              <td className="tb-tnx-amount is-alt">
                                <div className="tb-tnx-status">
                                  <span
                                    className={`badge badge-dot badge-${
                                      item.state === "posted" ? "success" : item.state === "Due" ? "warning" : "danger"
                                    }`}
                                  >
                                    {item.state}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Block>


        <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                setViewModal(false);
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">
                Transaction <small className="text-primary">#{detail.ref}</small>
              </h4>
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Order ID</span>
                  <span className="caption-text">{detail.ref}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Bill </span>
                  <span className="caption-text text-break">{detail.bill}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Transaction Fee</span>
                  <span className="caption-text">$ {detail.total}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Status</span>
                  <Badge
                    color={detail.status === "Paid" ? "success" : detail.status === "Due" ? "warning" : "danger"}
                    size="md"
                  >
                    {detail.status}
                  </Badge>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Issue Date</span>
                  <span className="caption-text"> {detail.issue}</span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Due Date</span>
                  <span className="caption-text"> {detail.due}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>


                         





    {/*  <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal2(false)}>
      <ModalBody style={{direction:i18n.language==="ar"?'rtl':'ltr'}}>
        <a
          href="#dropdownitem"
          onClick={(ev) => {
            ev.preventDefault();
            setModal2(false);
          }}
          className="close"
          style={{float:i18n.language==="ar"?'left':'right'}}
        >
          <Icon name="cross-sm"></Icon>
        </a>
        <div className="p-2">
          <h5 className="title" style={{textAlign:i18n.language==="ar"?'right':'left'}}>{t('change_pass_title')}</h5>
          <p style={{textAlign:i18n.language==="ar"?'right':'left'}}>{t('change_pass_desc')}.</p>

          <br />

          <form className="is-alter" onSubmit={handleSubmit()}>
            <FormGroup>
              <div className="form-label-group">
                <label className="form-label" htmlFor="old_password">
                {t('old_password')}
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#old_password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  style={{left:i18n.language==="ar"?'1px':'unset',right:i18n.language==="ar"?'unset':'1px'}}
                  className={`form-icon lg form-icon-right passcode-switch ${"is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={"text"}
                  id="old_password"
                  name="old_password"
                  value={userData.old_password}
                  ref={register({ required: t('field_required_error',{ns:"common"}) })}
                  placeholder={t('enter_old_password')}
                  className={`form-control-lg form-control ${"is-shown"}`}
                  onChange={(e) => setUserData({ ...userData, old_password: e.target.value })}
                  style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
                />
                {errors.old_password && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </FormGroup>

            <FormGroup>
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                {t('enter_new_password')}
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                style={{left:i18n.language==="ar"?'1px':'unset',right:i18n.language==="ar"?'unset':'1px'}}
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${"is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={"text"}
                  id="password"
                  name="passcode"
                  value={userData.password}
                  ref={register({ required: t('field_required_error',{ns:"common"}) })}
                  placeholder={t('enter_password')}
                  className={`form-control-lg form-control ${"is-shown"}`}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
                />
                {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </FormGroup>

            <FormGroup>
              <div className="form-label-group">
                <label className="form-label" htmlFor="confirm_password">
                {t('confirm_password')}
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                style={{left:i18n.language==="ar"?'1px':'unset',right:i18n.language==="ar"?'unset':'1px'}}
                  href="#confirm_password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${"is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={"text"}
                  id="confirm_password"
                  name="confirm_password"
                  value={userData.confirm_password}
                  ref={register({ required: t('field_required_error',{ns:"common"}) })}
                  placeholder={t('enter_confirm_password')}
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
                  style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
                />
                {errors.confirm_password && <span className="invalid">{errors.confirm_password.message}</span>}
              </div>
            </FormGroup>

            <div style={{ color: "red", textAlign: "center", visibility:  "visible"}}>
              Password & Confirm Password must match!
            </div>

            <FormGroup>
              <Button type="submit" color="primary" size="lg" className="btn-block">
                 <Spinner size="sm" color="light" /> : {t('change_pass_btn',{ns:'common'})}
              </Button>
            </FormGroup>
          </form>
        </div>
      </ModalBody>
    </Modal>*/} 
        









      
    </React.Fragment>
  );
};

export default PaymentHistory;


{/*   <BlockHead size="sm" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{t('payment_history_title')}</BlockTitle>
              <BlockDes className="text-soft">
                <p>{t('payment_history_desc')}</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      
      
      
      
       <BlockHead size="sm" style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}}>
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{t('payment_history_title')}</BlockTitle>
            <BlockDes className="text-soft" style={{textAlign:i18n.language==="ar"?'right':'left'}}>
              <p style={{width:"fit-content"}}>{t('payment_history_desc')}</p>
            </BlockDes>
          </BlockHeadContent>
         
          <BlockHeadContent>
            <ul className="nk-block-tools g-4 flex-wrap">
              <li className="order-md-last">
                <Link to="/help/ticket/create" className="btn btn-white btn-dim btn-outline-primary">
                  <span>{t('create_invoice_btn',{ns:'common'})}</span>
                </Link>
              </li>
            </ul>
          </BlockHeadContent>
        
        </BlockBetween>
        </BlockHead>
      */}
