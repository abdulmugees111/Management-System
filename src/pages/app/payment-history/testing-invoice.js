import { Link } from "react-router-dom";
import React, { useState } from "react";
import Head from "../../../layout/head/Head";
import { Card } from "reactstrap";
import {
  Block,
  RSelect,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  InputSwitch,
  Button,
  Icon,
  Col,
  Row
  
} from "../../../components/Component";
import DatePicker from "react-datepicker"
import Select from 'react-select'
import { Spinner, Modal, ModalBody, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { update_password } from "../../../services/user";
import { toast } from "react-toastify";
import store from "store";
import { useTranslation } from "react-i18next";
import "./testing.css";
import { Agreement } from '../../../services/agreement-consultation/agreement-consultation'
const InvoiceForm = ({ history }) => {
  //const { t,i18n } = useTranslation(['invoices','account_settings','common','notification']);
  const { t, i18n } = useTranslation(["invoices", "account_settings", "common", "notification"]);
  const [passState, setPassState] = useState(false);
  const [isConfirmPassSame, setIsConfirmPassSame] = useState(true);
  const [serviceDate, setServiceDate] = useState(new Date());
  const [quotationExpire, setQuotationExpire] = useState(new Date());
   const [planSchedule	, setPlanSchedule] = useState(new Date());
  
  const [invoiceData, setInvoiceData] = useState({
    customer: "",
    serviceType: "",
    serviceDate: serviceDate,
    QuotationExpire: quotationExpire,
    Taxes: "",
    paymentType: "",
    paymentMethod: "",
    paymentType: "",  
    price:"",
    firstPaid:"",
    planSchedule:planSchedule
  });
console.log("invoiceData.serviceDate",invoiceData.serviceType)
  const [modal, setModal] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const { isFetching, refetch } = useQuery(["Agreement", invoiceData], () => Agreement(invoiceData), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        setInvoiceData({
          customer: "",
          serviceType: "",
          serviceDate: "",
          QuotationExpire: "",
          Taxes: "",
          paymentType: "",
          paymentMethod: "",
          paymentType: "",  
          price:"",
          firstPaid:"",
          planSchedule:""
        });
        toast.success(t('Password Changed Successfully! Please Login again with new password',{ns:'notification'}));
       
      } else {
        toast.error(t('Error occurred while processing your request',{ns:'notification'}));
      }
      //
    },
  });

  const handleFormSubmit = (e) => {
    console.log("helloa")
    // if (userData.password === userData.confirm_password) {
    //   setIsConfirmPassSame(true);
       refetch();
    // } else {
    //   setIsConfirmPassSame(false);
    // }
  };
  const options = [
    { value: 'Agreement Consultations', label: 'Agreement Consultations' },
    { value: 'Issues', label: 'Issues' },
    { value: 'Legal Consultations', label: 'Legal Consultations' }
  ]
  const taxesOptions = [
    { value: 'Include Tax', label: 'Include Tax'},
    { value: 'Exclude Tax', label: 'Exclude Tax' },
    
  ]
  const PaymentTypeOptions = [
    { value: 'Month', label: 'Month' },
    { value: 'Quarter', label: 'Quarter' },
    { value: 'Semi Annual', label: 'Semi Annual' },
    { value: 'Annual', label: 'Annual' },
    { value: 'Other', label: 'Other' }
  ]
  const PaymentMethodOptions = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Check', label: 'Check' },
    { value: 'Transer', label: 'Transer' }
  ]
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
                      <div className={`tab-pane active`} id="personal" style={{flexDirection: i18n.language === "ar" ? "row-reverse":"row"}}>
                      <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
        
                        <Row className="gy-4" style={{direction: i18n.language === "ar" ? "rtl":"ltr"}}>
                          <Col md="6">
                          <FormGroup>
                          <label className="form-label" htmlFor="test">
                          {t("Customer")}
                        </label>
                          <RSelect
                          onChange={(e) =>   setInvoiceData({ ...invoiceData, customer: e.value })}
                          />
                        </FormGroup>
                          </Col>
        
        
                          <Col md="6">
                            <FormGroup>
                    <label className="form-label" htmlFor="test">
                    {t("Service Type")}
                  </label>
                  <Select options={options}
                  onChange={(e) =>   setInvoiceData({ ...invoiceData, serviceType: e.value })}
                  />
                  </FormGroup>
                          </Col>
        
        
                          <Col md="6">
                            <FormGroup>
                  <label className="form-label" htmlFor="test">
                  {t("Service Date")}
          </label>                 {/* onChange={(e) =>   setInvoiceData({ ...invoiceData, serviceType: e.target.value })}*/}

                <DatePicker selected={serviceDate} onChange={(date) => setServiceDate(date)} className="form-control date-picker"  />
                </FormGroup>
        
                          </Col>
        
        
                          <Col md="6">
                              <FormGroup>
                <label className="form-label" htmlFor="test">
                {t("Quotation Expire")}
              </label>
              <DatePicker selected={quotationExpire} onChange={(date) => setQuotationExpire(date)} className="form-control date-picker" />
              </FormGroup>
                          </Col>
        
        
        
                          <Col md="6">
                            <FormGroup>
              <div>
            <input type="checkbox" className="custom-control-sm "/>
            <label className="form-label" htmlFor="test">
              {t("General")}
            </label>
            </div>
        
            <div>
            <input type="checkbox" className="custom-control-sm "/>
            <label className="form-label" htmlFor="test">
              {t("Governance")}
            </label>
            </div>
        
            <div>
            <input type="checkbox" className="custom-control-sm "/>
            <label className="form-label" htmlFor="test">
              {t("HR")}
            </label>
            </div>
        
            <div>
            <input type="checkbox" className="custom-control-sm "/>
            <label className="form-label" htmlFor="test">
              {t("Other")}
            </label>
            </div>
        
            
              
           
            </FormGroup>
        
                          </Col>
        
                          <h2 className="title" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
                          {t("Accounting Information")}
                        </h2>
        
                          <Col md="6">
                          <FormGroup>
                          <label className="form-label" htmlFor="test">
                          {t("Taxes")}
                        </label>
                        <Select options={taxesOptions} 
                        onChange={(e) =>   setInvoiceData({ ...invoiceData, Taxes: e.value })}
                        />
                        </FormGroup>
                          </Col>
        
        
        
                          <Col md="6">
                            <FormGroup>
        <label className="form-label" htmlFor="test">
        {t("Payment Type")}
        </label>
        <Select options={PaymentTypeOptions} 
        onChange={(e) =>   setInvoiceData({ ...invoiceData, paymentType: e.value })}
        />
        </FormGroup>
                          </Col>
        
        
        
        
                          <Col md="6">
                           <FormGroup>
        <label className="form-label" htmlFor="test">
        {t("Payment Method")}
        </label>
        <Select options={PaymentMethodOptions} 
        onChange={(e) =>   setInvoiceData({ ...invoiceData, paymentMethod: e.value })}
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
        placeholder={t('0.00')}
        className={`form-control-lg form-control "}`}
        // onChange={(e) => setUserData({ ...userData, old_password: e.target.value })}
        onChange={(e) =>   setInvoiceData({ ...invoiceData, price: e.target.value })}
        style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
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
                         placeholder={t('0.00scas')}
                         className={`form-control-lg form-control "}`}
                         onChange={(e) =>   setInvoiceData({ ...invoiceData, firstPaid: e.target.value })}
                         style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
                         />
                         </FormGroup>  
        
                        </Col>
        
        
                        <Col md="6">
                        <FormGroup>
                <label className="form-label" htmlFor="test">
                {t("Plan Schedule")}
              </label>
              <DatePicker selected={planSchedule} onChange={(date) => setPlanSchedule(date)} className="form-control date-picker" />
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