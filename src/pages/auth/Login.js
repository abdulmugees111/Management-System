import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { connect } from 'react-redux'
import Fawterha from '../../assets/images/jsTree/fawterhalogo.png';
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard
} from "../../components/Component";


import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Multistep from '../../onBoardingForm/onBoardingForm'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  logo: settings.logo,
})


const Login = ({ dispatch, user, authProvider, logo }) => {
  const { t } = useTranslation();
  const [passState, setPassState] = useState(false);
  const [errorVal] = useState("");

  const onFinish = values => {
    dispatch({
      type: 'user/LOGIN',
      payload: values,
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  {/*<a href={`${process.env.PUBLIC_URL}/user-profile`}  style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}}>sdfvdbd</a>*/}
  
  const { errors, register, handleSubmit } = useForm();
// console.log("onFinishFailed",onFinishFailed)
// console.log("mapStateToProps",mapStateToProps)
// console.log("dispatch",dispatch)
// console.log("user",user)
// console.log("authProvider",authProvider)
// console.log("logo",logo)
// console.log("passState",passState)
// console.log("errorVal",errorVal)
// console.log("payload",dispatch.values) 
// console.log("onFinish",onFinish)

return (
    <React.Fragment>
          <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
             {/*<img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />*/ } 
             <img className="logo-dark logo-img logo-img-lg" src={Fawterha} alt="Fawterha logo" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign-In</BlockTitle>
                <BlockDes>
                  <p>Access {t("app_name")} using your email and password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFinish)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                  tabIndex={1}
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: t('field_required_error',{ns:"common"}) })}
                    // defaultValue="admin"
                    placeholder="Enter your email address or username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                    Forgot Code?
                  </Link>
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
                  tabIndex={2}
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    // defaultValue="admin"
                    ref={register({ required: t('field_required_error',{ns:"common"}) })}
                    placeholder="Enter your Password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
              <FormGroup tabIndex={3}>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {user.loading? <Spinner size={'sm'} color="white" /> : <span>Sign in</span>}
                </Button>
              </FormGroup>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth/register`}>Create an account</Link>
            </div>
            <div className="form-note-s2 text-center pt-4">
            {" "}
            New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth/login/profile`}>Create an testing</Link>
          </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
      {/*<Multistep/>*/}
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(Login)
