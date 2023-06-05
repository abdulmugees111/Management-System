import { Link } from "react-router-dom";
import React, { useState } from "react";
// import Head from "../../../layout/head/Head";
// import { Card } from "reactstrap";
import {
  // Block,
  RSelect,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  // InputSwitch,
  Button,
  Icon,
  Col,
  Row,
} from "../../../components/Component";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Spinner, Modal, ModalBody, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
// import { update_password } from "../../../services/user";
import { toast } from "react-toastify";
// import store from "store";
import { useTranslation } from "react-i18next";
import "./testing.css";
import { Agreement } from "../../../services/agreement-consultation/agreement-consultation";
// import Moment from "react-moment";
// import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
const InvoiceForm = ({ history }) => {
  //const { t,i18n } = useTranslation(['invoices','account_settings','common','notification']);
  const { t, i18n } = useTranslation(["invoices", "account_settings", "common", "notification"]);
  const [serviceDate, setServiceDate] = useState();
  const [quotationExpire, setQuotationExpire] = useState();
  const [planSchedule, setPlanSchedule] = useState();//new Date()
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  let firstDate = dayjs(serviceDate).format("YYYY-MM-DD");
  let secondDate = dayjs(quotationExpire).format("YYYY-MM-DD");
  let thirdDate = dayjs(planSchedule).format("YYYY-MM-DD");

  
  
  const [invoiceData, setInvoiceData] = useState({
    partner_id: 41,
    service_type: "",
    date: firstDate,
    quota_expire: secondDate,
    tax_id: "",
    payment_type: "",
    payment_method: "",
    price: "",
    first_paid: "",
    plan_schedule:thirdDate,
    agreement_consult_general: isChecked1,
    agreement_consult_governance:isChecked2,
    agreement_consult_hr:isChecked3,
    agreement_consult_other: isChecked4,
  
  });


  // const test = (e) => setInvoiceData({ ...invoiceData, date: e.firstDate })
  // console.log(test,"test",invoiceData.date)


  console.log("demo",firstDate)
  console.log("demo",secondDate)
  console.log("demo",thirdDate)
  console.log(isChecked4)
  const [modal, setModal] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const { isFetching, refetch } = useQuery(["Agreement", invoiceData], () => Agreement(invoiceData), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        setInvoiceData({
          partner_id: "",
          service_type: "",
          date: "",
          quota_expire:"",
          tax_id: "",
          payment_type: "",
          payment_method: "",
          price: "",
          first_paid: "",
          plan_schedule: "",
          agreement_consult_general:"",
          agreement_consult_governance:"",
          agreement_consult_hr: "",
          agreement_consult_other:"",
        });
        toast.success(t("Password Changed Successfully! Please Login again with new password", { ns: "notification" }));
      } else {
        toast.error(t("Error occurred while processing your request", { ns: "notification" }));
      }
      //
    },
  });
  const handleFormSubmit = (e) => {
    refetch();
  };

  const options = [
    { value: "ac", label: "Agreement Consultations" },
    { value: "issue", label: "Issues" },
    { value: "lc", label: "Legal Consultations" },
  ];
  const taxesOptions = [
    { value: 1, label: "Include Tax" },
    { value: 2, label: "Exclude Tax" },
  ];
  const PaymentTypeOptions = [
    { value: "month", label: "Month" },
    { value: "quarter", label: "Quarter" },
    { value: "semi_annual", label: "Semi Annual" },
    { value: "annual", label: "Annual" },
    { value: "other", label: "Other" },
  ];
  const PaymentMethodOptions = [
    { value: "cash", label: "Cash" },
    { value: "check", label: "Check" },
    { value: "transfer", label: "Transfer" },
  ];
  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };
  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };
  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };
  const handleCheckboxChange4 = () => {
    setIsChecked4(!isChecked4);
  };
  const handleDateChange1 = (date1) => {
    setServiceDate(date1)
  }
  const handleDateChange2 = (date2) => {
    setQuotationExpire(date2);
  }
  const handleDateChange3 = (date3) => {
    setPlanSchedule(date3)
  };
  return (
    <React.Fragment>
      <BlockHead size="sm" style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
              {t("payment_history_title")}
            </BlockTitle>
            <BlockDes className="text-soft" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
              <p style={{ width: "fit-content" }}>{t("payment_history_desc")}</p>
            </BlockDes>
          </BlockHeadContent>

          <BlockHeadContent>
            <ul className="nk-block-tools g-4 flex-wrap">
              <li className="order-md-last">
                <Link onClick={() => setModal(true)} className="btn btn-white btn-dim btn-outline-primary">
                  <span>{t("create_invoice_btn", { ns: "common" })}</span>
                </Link>
              </li>
            </ul>
          </BlockHeadContent>
        </BlockBetween>
      </BlockHead>

      <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
        <ModalBody style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
          <a
            href="#dropdownitem"
            onClick={(ev) => {
              ev.preventDefault();
              setModal(false);
            }}
            className="close"
            style={{ float: i18n.language === "ar" ? "left" : "right" }}
          >
            <Icon name="cross-sm"></Icon>
          </a>

          <div className="p-2">
            <h5 className="title" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
              {t("create_invoice")}
            </h5>
            <br />

            <div className="tab-content">
              <div
                className={`tab-pane active`}
                id="personal"
                style={{ flexDirection: i18n.language === "ar" ? "row-reverse" : "row" }}
              >
                <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
                  <Row className="gy-4" style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Customer")}
                        </label>
                        <RSelect onChange={(e) => setInvoiceData({ ...invoiceData, partner_id: e.value })} />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Service Type")}
                        </label>
                        <Select
                          options={options}
                          onChange={(e) => setInvoiceData({ ...invoiceData, service_type: e.value })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Service Date")}
                        </label>{" "}
                        {/* onChange={(e) =>   setInvoiceData({ ...invoiceData, serviceType: e.target.value })}
                        <DatePicker
                          selected={serviceDate}
                          onChange={(date) => setServiceDate(date)}
                          className="form-control date-picker"
                        />*/}
                        <DatePicker
                        selected={serviceDate}
                        onChange={handleDateChange1}
                        className="form-control date-picker"
                      />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Quotation Expire")}
                        </label>
                       { /*<input type="date"  selected={quotationExpire}
                        onChange={(date) => setQuotationExpire(date)}
          className="form-control date-picker"/>*/}

                       {/* <DatePicker
                          format="YYYY/MM/DD"
                          selected={quotationExpire}
                          onChange={(date) => setQuotationExpire(date)}
                          className="form-control date-picker"
          />*/}
          <DatePicker
          selected={quotationExpire}
          onChange={handleDateChange2}
          className="form-control date-picker"
        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <div class="custom-control">
                        <input
                        type="checkbox"
                        checked={isChecked1}
                        onChange={handleCheckboxChange1}
                        className="custom-control-sm "
                      />
                          {/*<input
                            type="checkbox"
                            className="custom-control-sm "
                            name="checkbox1"
                            checked={checkboxes.checkbox1}
                            onChange={handleCheckboxChange}
                          />*/}
                          <label className="form-label" htmlFor="test">
                            {t("General")}
                          </label>
                        </div>

                        <div class="custom-control"> 
                        <input
                        type="checkbox"
                        checked={isChecked2}
                        onChange={handleCheckboxChange2}
                        className="custom-control-sm "
                      />
                          <label className="form-label" htmlFor="test">
                            {t("Governance")}
                          </label>
                        </div>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <div class="custom-control">
                        <input
                        type="checkbox"
                        checked={isChecked3}
                        onChange={handleCheckboxChange3}
                        className="custom-control-sm "
                      />
                          <label className="form-label" htmlFor="test">
                            {t("HR")}
                          </label>
                        </div>


                        <div class="custom-control">
                        <input
                        type="checkbox"
                        checked={isChecked4}
                        onChange={handleCheckboxChange4}
                        className="custom-control-sm "
                      />
                          <label className="form-label" htmlFor="test">
                            {t("Other")}
                          </label>
                        </div>
                      </FormGroup>
                    </Col>


                    <Col md="12">
                      <h3 className="title" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
                        {t("Accounting Information")}
                      </h3>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Taxes")}
                        </label>
                        <Select
                          options={taxesOptions}
                          onChange={(e) => setInvoiceData({ ...invoiceData, tax_id: e.value })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Payment Type")}
                        </label>
                        <Select
                          options={PaymentTypeOptions}
                          onChange={(e) => setInvoiceData({ ...invoiceData, payment_type: e.value })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Payment Method")}
                        </label>
                        <Select
                          options={PaymentMethodOptions}
                          onChange={(e) => setInvoiceData({ ...invoiceData, payment_method: e.value })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Price")}
                        </label>
                        <input
                          type="text"
                          placeholder={t("0.00")}
                          className={`form-control-lg form-control "}`}
                          // onChange={(e) => setUserData({ ...userData, old_password: e.target.value })}
                          onChange={(e) => setInvoiceData({ ...invoiceData, price: e.target.value })}
                          style={{ paddingRight: i18n.language === "ar" ? "0.5rem" : "1rem" }}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("First Paid")}
                        </label>
                        <input
                          type="text"
                          placeholder={t("0.00scas")}
                          className={`form-control-lg form-control "}`}
                          onChange={(e) => setInvoiceData({ ...invoiceData, first_paid: e.target.value })}
                          style={{ paddingRight: i18n.language === "ar" ? "0.5rem" : "1rem" }}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <label className="form-label" htmlFor="test">
                          {t("Plan Schedule")}
                        </label>
                      {/**  <DatePicker
                          selected={planSchedule}
                          onChange={(date) => setPlanSchedule(date)}
                          className="form-control date-picker"
                        />*/}
                        <DatePicker
                        selected={planSchedule}
                        onChange={handleDateChange3}
                        className="form-control date-picker"
                      />
                      </FormGroup>
                    </Col>

                    <FormGroup>
                      <Button type="submit" color="primary" size="lg" className="btn-block">
                        {isFetching ? <Spinner size="sm" color="light" /> : t("create_invoice_btn", { ns: "common" })}
                      </Button>
                    </FormGroup>
                  </Row>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default InvoiceForm;


// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import dayjs from "dayjs";

// const YourComponent = () => {
//   const [quotationExpire, setQuotationExpire] = React.useState(null);

//   const handleDateChange = (date) => {
//     setQuotationExpire(date);
//   };
//   const demo = dayjs(quotationExpire).format("YYYY/MM/DD");
//   console.log("days", dayjs(quotationExpire).format("YYYY/MM/DD"));
//   console.log(demo);
//   return (
//     <div>
//       <DatePicker
//         selected={quotationExpire}
//         onChange={handleDateChange}
//         className="form-control date-picker"
//       />
//     </div>
//   );
// };

// export default YourComponent;


// <div className="p-2">
// <h5 className="title" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
//   {t("create_invoice")}
// </h5>
// <p style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>{t("invoice_text")}.</p>

// <br />

// <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>

//   <FormGroup>
//   <label className="form-label" htmlFor="test">
//   {t("Customer")}
// </label>
//   <RSelect/>
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Service Type")}
// </label>
// <Select options={options} />
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Service Date")}
// </label>
// <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control date-picker"  />
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Quotation Expire")}
// </label>
// <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control date-picker" />
// </FormGroup>

// <FormGroup>
// <div>

// <input type="checkbox" className="custom-control-sm "/>
// <label className="form-label" htmlFor="test">
// {t("General")}
// </label>
// </div>

// <div>

// <input type="checkbox" className="custom-control-sm "/>
// <label className="form-label" htmlFor="test">
// {t("Governance")}
// </label>
// </div>

// <div>

// <input type="checkbox" className="custom-control-sm "/>
// <label className="form-label" htmlFor="test">
// {t("HR")}
// </label>
// </div>

// <div>

// <input type="checkbox" className="custom-control-sm "/>
// <label className="form-label" htmlFor="test">
// {t("Other")}
// </label>
// </div>

// </FormGroup>

// <h2 className="title" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
// {t("Accounting Information")}
// </h2>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Taxes")}
// </label>
// <Select options={taxesOptions} />
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Payment Type")}
// </label>
// <Select options={PaymentTypeOptions} />
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Payment Method")}
// </label>
// <Select options={PaymentMethodOptions} />
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Price")}
// </label>
// <input
// type="text"
// placeholder={t('0.00')}
// className={`form-control-lg form-control "}`}
// onChange={(e) => setUserData({ ...userData, old_password: e.target.value })}
// style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
// />
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("First Paid")}
// </label>
// <input
// type="text"
// placeholder={t('0.00scas')}
// className={`form-control-lg form-control "}`}
// onChange={(e) => setUserData({ ...userData, old_password: e.target.value })}
// style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
// />
// </FormGroup>

// <FormGroup>
// <label className="form-label" htmlFor="test">
// {t("Plan Schedule")}
// </label>
// <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control date-picker" />
// </FormGroup>

//   <FormGroup>
//     <Button type="submit" color="primary" size="lg" className="btn-block">
//       {isFetching ? <Spinner size="sm" color="light" /> : t("create_invoice_btn", { ns: "common" })}
//     </Button>
//   </FormGroup>
// </form>
// </div>
