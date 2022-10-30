import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { register_user } from "../../services/user";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

const Register = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [isConfirmPassSame, setIsConfirmPassSame] = useState(true)
  const [userData, setUserData] = useState({
    name:"",
    login:"",
    password:"",
    confirm_password:""
  })
  const { errors, register, handleSubmit } = useForm();

  const { isFetching, refetch, } = useQuery(["get-project-domain", userData], () => register_user(userData),
  {
    enabled:false,
    onSuccess:(data)=>{
      if(data){
        setUserData({
          name: "",
          login: "",
          password: "",
          confirm_password: "",
        });
        toast.success('Registered Successfully!')
      }else{
      toast.error("Error occurred while processing your request!");

      }
      // 
    },
    onError:()=>{
      toast.error("Error occurred while processing your request!");
    }
  
  });

  const handleFormSubmit = (e) => {
    if(userData.password === userData.confirm_password){
      setIsConfirmPassSame(true);
      refetch()
    }else{
      setIsConfirmPassSame(false)
    }
  };


  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create New Tajr Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              <FormGroup>
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    placeholder="Enter your name"
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                  {errors.name && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="default-01"
                    name="email"
                    value={userData.login}
                    ref={register({ required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address or username"
                    onChange={(e) => setUserData({ ...userData, login: e.target.value })}
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
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
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>

              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="confirm_password">
                    Confirm Passcode
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
                    placeholder="Enter your confirm passcode"
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
                  {isFetching ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </FormGroup>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth/login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;
