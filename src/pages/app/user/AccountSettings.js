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

const UserProfileSettingPage = ({history}) => {
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
         toast.success("Password Changed Successfully! Please Login again with new password");
         handleSignout();
       } else {
         toast.error("Error occurred while processing your request!");
       }
       //
     },
     onError: () => {
       toast.error("Error occurred while processing your request!");
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
     <Head title="User List - Profile"></Head>

     <BlockHead size="lg">
       <BlockBetween>
         <BlockHeadContent>
           <BlockTitle tag="h4">Security Settings</BlockTitle>
           <BlockDes>
             <p>These settings will help you to keep your account secure.</p>
           </BlockDes>
         </BlockHeadContent>
       </BlockBetween>
     </BlockHead>

     <Block>
       <Card className="card-bordered">
         <div className="card-inner-group">
           <div className="card-inner">
             <div className="between-center flex-wrap g-3">
               <div className="nk-block-text">
                 <h6>Change Password</h6>
                 <p>Set a unique password to protect your account.</p>
               </div>
               <div className="nk-block-actions flex-shrink-sm-0">
                 <ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
                   <li className="order-md-last">
                     <Button color="primary" onClick={() => setModal(true)}>
                       Change Password
                     </Button>
                   </li>
                   {/* <li>
                     <em className="text-soft text-date fs-12px">
                       Last changed: <span>Oct 2, 2019</span>
                     </em>
                   </li> */}
                 </ul>
               </div>
             </div>
           </div>
           <div className="card-body">
             <div className="between-center flex-wrap flex-md-nowrap g-3">
               <div className="nk-block-text">
                 <h6>
                   2 Factor Auth (Coming Soon) &nbsp; <span className="badge badge-success ml-0">Enabled</span>
                 </h6>
                 <p>
                   Secure your account with 2FA security. When it is activated you will need to enter not only your
                   password, but also a special code using app. You will receive this code via mobile application.{" "}
                 </p>
               </div>
               <div className="nk-block-actions">
                 <Button color="primary">Disable</Button>
               </div>
             </div>
           </div>
         </div>
       </Card>
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
           <h5 className="title">Change Password</h5>
           <p>Set a unique password to protect your account.</p>

           <br />

           <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
             <FormGroup>
               <div className="form-label-group">
                 <label className="form-label" htmlFor="old_password">
                   Old Password
                 </label>
               </div>
               <div className="form-control-wrap">
                 <a
                   href="#old_password"
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
                   id="old_password"
                   name="old_password"
                   value={userData.old_password}
                   ref={register({ required: "This field is required" })}
                   placeholder="Enter your old password"
                   className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                   onChange={(e) => setUserData({ ...userData, old_password: e.target.value })}
                 />
                 {errors.old_password && <span className="invalid">{errors.passcode.message}</span>}
               </div>
             </FormGroup>

             <FormGroup>
               <div className="form-label-group">
                 <label className="form-label" htmlFor="password">
                   New Password
                 </label>
               </div>
               <div className="form-control-wrap">
                 <a
                   href="#password"
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
                   id="password"
                   name="passcode"
                   value={userData.password}
                   ref={register({ required: "This field is required" })}
                   placeholder="Enter your password"
                   className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                   onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                 />
                 {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
               </div>
             </FormGroup>

             <FormGroup>
               <div className="form-label-group">
                 <label className="form-label" htmlFor="confirm_password">
                   Confirm New Password
                 </label>
               </div>
               <div className="form-control-wrap">
                 <a
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
                   ref={register({ required: "This field is required" })}
                   placeholder="Enter your confirm password"
                   className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                   onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
                 />
                 {errors.confirm_password && <span className="invalid">{errors.confirm_password.message}</span>}
               </div>
             </FormGroup>

             <div style={{ color: "red", textAlign: "center", visibility: !isConfirmPassSame ? "visible" : "hidden" }}>
               Password & Confirm Password must match!
             </div>

             <FormGroup>
               <Button type="submit" color="primary" size="lg" className="btn-block">
                 {isFetching ? <Spinner size="sm" color="light" /> : "Change Password"}
               </Button>
             </FormGroup>
           </form>
         </div>
       </ModalBody>
     </Modal>
   </React.Fragment>
 );
};
export default UserProfileSettingPage;