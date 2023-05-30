// import React, { useState, useEffect } from "react";
// import Head from "../../../layout/head/Head";
// import { Card } from "reactstrap";
// import {
//   Block,
//   BlockBetween,
//   BlockDes,
//   BlockHead,
//   BlockHeadContent,
//   BlockTitle,
//   InputSwitch,
//   Button,
//   Icon,
// } from "../../../components/Component";
// import { Spinner, Modal, ModalBody, FormGroup } from "reactstrap";
// import { useForm } from 'react-hook-form';
// import { useQuery } from '@tanstack/react-query';
// import { update_password } from "../../../services/user";
// import { toast } from 'react-toastify';
// import store from "store";
// import { useTranslation } from "react-i18next";
 import { Link } from "react-router-dom";
// import Content from "../../../layout/content/Content";
// import DatePicker from "react-datepicker";
// import {
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownToggle,
//   DropdownItem,
//   Form,
//   Badge,
// } from "reactstrap";
// import {
//   Col,
//   PaginationComponent,
//   Row,
//   RSelect,
// } from "../../../components/Component";
// import { statusOptions, paymentData } from "./Invoice";
// import { dateFormatterAlt } from "../../../utils/Utils";
// import { get_invoices } from "../../../services/invoice";



// const InvoiceForm = ({history}) => {
//   const { t,i18n } = useTranslation(['invoices','account_settings','common','notification']);
//       const [passState, setPassState] = useState(false);
//       const [isConfirmPassSame, setIsConfirmPassSame] = useState(true);

//     const [userData, setUserData] = useState({
//       old_password: "",
//       password: "",
//       confirm_password: "",
//     });

//      const handleSignout = () => {
//        store.remove("access_token");
//        store.remove("refresh_token");
//        store.remove("uid");
//          history.push(`${process.env.PUBLIC_URL}/auth/login`);
//      };

//   const [modal, setModal] = useState(false);
//   const { errors, register, handleSubmit } = useForm();

//    const { isFetching, refetch } = useQuery(["update-password", userData], () => update_password(userData), {
//      enabled: false,
//      onSuccess: (data) => {
//        if (data) {
//          setUserData({
//            old_password: "",
//            password: "",
//            confirm_password: "",
//          });
//          toast.success(t('Password Changed Successfully! Please Login again with new password',{ns:'notification'}));
//          handleSignout();
//        } else {
//          toast.error(t('Error occurred while processing your request',{ns:'notification'}));
//        }
//        //
//      },
//      onError: () => {
//        toast.error(t('Error occurred while processing your request',{ns:'notification'}));
//      },
//    });

//  const handleFormSubmit = (e) => {
//    if (userData.password === userData.confirm_password) {
//      setIsConfirmPassSame(true);
//      refetch();
//    } else {
//      setIsConfirmPassSame(false);
//    }
//  };
//  return (
//    <React.Fragment>




//    <Head title={t('payment_history_title')}></Head>
//    <Content>
//           <BlockHead size="sm" style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}}>
//      <BlockBetween>
//        <BlockHeadContent>
//          <BlockTitle page style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{t('payment_history_title')}</BlockTitle>
//          <BlockDes className="text-soft" style={{textAlign:i18n.language==="ar"?'right':'left'}}>
//            <p style={{width:"fit-content"}}>{t('payment_history_desc')}</p>
//          </BlockDes>
//        </BlockHeadContent>
     
//        <BlockHeadContent>
//          <ul className="nk-block-tools g-4 flex-wrap">
//            <li className="order-md-last">
           
//              <Link   onClick={() => setModal(true)} className="btn btn-white btn-dim btn-outline-primary">
//                <span>{t('create_invoice_btn',{ns:'common'})}</span>
//              </Link>
//            </li>
//          </ul>
//        </BlockHeadContent>
//      </BlockBetween>
//      </BlockHead>
//      </Content>

   

//      <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
//        <ModalBody style={{direction:i18n.language==="ar"?'rtl':'ltr'}}>
//          <a
//            href="#dropdownitem"
//            onClick={(ev) => {
//              ev.preventDefault();
//              setModal(false);
//            }}
//            className="close"
//            style={{float:i18n.language==="ar"?'left':'right'}}
//          >
//            <Icon name="cross-sm"></Icon>
//          </a>
//          <div className="p-2">
//            <h5 className="title" style={{textAlign:i18n.language==="ar"?'right':'left'}}>{t('change_pass_title')}</h5>
//            <p style={{textAlign:i18n.language==="ar"?'right':'left'}}>{t('change_pass_desc')}.</p>

//            <br />

//            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
//              <FormGroup>
//                <div className="form-label-group">
//                  <label className="form-label" htmlFor="old_password">
//                  {t('old_password')}
//                  </label>
//                </div>
//                <div className="form-control-wrap">
//                  <a
//                    href="#old_password"
//                    onClick={(ev) => {
//                      ev.preventDefault();
//                      setPassState(!passState);
//                    }}
//                    style={{left:i18n.language==="ar"?'1px':'unset',right:i18n.language==="ar"?'unset':'1px'}}
//                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
//                  >
//                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

//                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
//                  </a>
//                  <input
//                    type={passState ? "text" : "password"}
//                    id="old_password"
//                    name="old_password"
//                    value={userData.old_password}
//                    ref={register({ required: t('field_required_error',{ns:"common"}) })}
//                    placeholder={t('enter_old_password')}
//                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
//                    onChange={(e) => setUserData({ ...userData, old_password: e.target.value })}
//                    style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
//                  />
//                  {errors.old_password && <span className="invalid">{errors.passcode.message}</span>}
//                </div>
//              </FormGroup>

//              <FormGroup>
//                <div className="form-label-group">
//                  <label className="form-label" htmlFor="password">
//                  {t('enter_new_password')}
//                  </label>
//                </div>
//                <div className="form-control-wrap">
//                  <a
//                  style={{left:i18n.language==="ar"?'1px':'unset',right:i18n.language==="ar"?'unset':'1px'}}
//                    href="#password"
//                    onClick={(ev) => {
//                      ev.preventDefault();
//                      setPassState(!passState);
//                    }}
//                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
//                  >
//                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

//                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
//                  </a>
//                  <input
//                    type={passState ? "text" : "password"}
//                    id="password"
//                    name="passcode"
//                    value={userData.password}
//                    ref={register({ required: t('field_required_error',{ns:"common"}) })}
//                    placeholder={t('enter_password')}
//                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
//                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//                    style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
//                  />
//                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
//                </div>
//              </FormGroup>

//              <FormGroup>
//                <div className="form-label-group">
//                  <label className="form-label" htmlFor="confirm_password">
//                  {t('confirm_password')}
//                  </label>
//                </div>
//                <div className="form-control-wrap">
//                  <a
//                  style={{left:i18n.language==="ar"?'1px':'unset',right:i18n.language==="ar"?'unset':'1px'}}
//                    href="#confirm_password"
//                    onClick={(ev) => {
//                      ev.preventDefault();
//                      setPassState(!passState);
//                    }}
//                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
//                  >
//                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

//                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
//                  </a>
//                  <input
//                    type={passState ? "text" : "password"}
//                    id="confirm_password"
//                    name="confirm_password"
//                    value={userData.confirm_password}
//                    ref={register({ required: t('field_required_error',{ns:"common"}) })}
//                    placeholder={t('enter_confirm_password')}
//                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
//                    onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
//                    style={{paddingRight:i18n.language==="ar"?'0.5rem':'1rem'}}
//                  />
//                  {errors.confirm_password && <span className="invalid">{errors.confirm_password.message}</span>}
//                </div>
//              </FormGroup>

//              <div style={{ color: "red", textAlign: "center", visibility: !isConfirmPassSame ? "visible" : "hidden" }}>
//                Password & Confirm Password must match!
//              </div>

//              <FormGroup>
//                <Button type="submit" color="primary" size="lg" className="btn-block">
//                  {isFetching ? <Spinner size="sm" color="light" /> : t('change_pass_btn',{ns:'common'})}
//                </Button>
//              </FormGroup>
//            </form>
//          </div>
//        </ModalBody>
//      </Modal>
//    </React.Fragment>
//  );
// };
// export default InvoiceForm;

import React, { useState } from "react";
import Head from "../../../layout/head/Head";
import { Card } from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  InputSwitch,
  Button,
  Icon,
} from "../../../components/Component";
import { Spinner, Modal, ModalBody, FormGroup } from "reactstrap";
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { update_password } from "../../../services/user";
import { toast } from 'react-toastify';
import store from "store";
import { useTranslation } from "react-i18next";

const InvoiceForm = ({history}) => {
 //const { t,i18n } = useTranslation(['invoices','account_settings','common','notification']);
  const { t,i18n } = useTranslation(['invoices','account_settings','common','notification']);
      const [passState, setPassState] = useState(false);
      const [isConfirmPassSame, setIsConfirmPassSame] = useState(true);

    const [userData, setUserData] = useState({
      old_password: "",
      password: "",
      confirm_password: "",
    });

     const handleSignout = () => {
       store.remove("access_token");
       store.remove("refresh_token");
       store.remove("uid");
         history.push(`${process.env.PUBLIC_URL}/auth/login`);
     };

  const [modal, setModal] = useState(false);
  const { errors, register, handleSubmit } = useForm();

   const { isFetching, refetch } = useQuery(["update-password", userData], () => update_password(userData), {
     enabled: false,
     onSuccess: (data) => {
       if (data) {
         setUserData({
           old_password: "",
           password: "",
           confirm_password: "",
         });
         toast.success(t('Password Changed Successfully! Please Login again with new password',{ns:'notification'}));
         handleSignout();
       } else {
         toast.error(t('Error occurred while processing your request',{ns:'notification'}));
       }
       //
     },
     onError: () => {
       toast.error(t('Error occurred while processing your request',{ns:'notification'}));
     },
   });

 const handleFormSubmit = (e) => {
   if (userData.password === userData.confirm_password) {
     setIsConfirmPassSame(true);
     refetch();
   } else {
     setIsConfirmPassSame(false);
   }
 };
 return (
   <React.Fragment>
   
  
          
   



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
              
                <Link   onClick={() => setModal(true)} className="btn btn-white btn-dim btn-outline-primary">
                  <span>{t('create_invoice_btn',{ns:'common'})}</span>
               </Link>
               </li>
             </ul>
           </BlockHeadContent>
         </BlockBetween>
         </BlockHead>







                    
 

     <Modal isOpen={modal} className="modal-dialog-centered" size="lg" toggle={() => setModal(false)}>
       <ModalBody style={{direction:i18n.language==="ar"?'rtl':'ltr'}}>
         <a
           href="#dropdownitem"
           onClick={(ev) => {
             ev.preventDefault();
             setModal(false);
           }}
           className="close"
           style={{float:i18n.language==="ar"?'left':'right'}}
         >
           <Icon name="cross-sm"></Icon>
         </a>
         <div className="p-2">
           <h5 className="title" style={{textAlign:i18n.language==="ar"?'right':'left'}}>{t('create_invoice')}</h5>
           <p style={{textAlign:i18n.language==="ar"?'right':'left'}}>{t('invoice_text')}.</p>

           <br />

           <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
             
           

            

             <FormGroup>
               <div className="form-label-group">
                 <label className="form-label" htmlFor="test">
                 {t('test')}
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
                   className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                 >
                   <Icon name="eye" className="passcode-icon icon-show"></Icon>

                   <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                 </a>
                 <input
                   type={passState ? "text" : "password"}
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

             <div style={{ color: "red", textAlign: "center", visibility: !isConfirmPassSame ? "visible" : "hidden" }}>
               Password & Confirm Password must match!
             </div>

             <FormGroup>
               <Button type="submit" color="primary" size="lg" className="btn-block">
                 {isFetching ? <Spinner size="sm" color="light" /> : t('change_pass_btn',{ns:'common'})}
               </Button>
             </FormGroup>
           </form>
         </div>
       </ModalBody>
     </Modal>
   </React.Fragment>
 );
};
export default InvoiceForm;