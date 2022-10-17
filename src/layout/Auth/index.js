import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Login from "../../pages/auth/Login";

const mapStateToProps = ({ settings }) => ({
  logo: settings.logo,
  isGrayTopbar: settings.isGrayTopbar,
  isCardShadow: settings.isCardShadow,
  isSquaredBorders: settings.isSquaredBorders,
  isBorderless: settings.isBorderless,
  authPagesColor: settings.authPagesColor
});

const AuthLayout = ({
  children,
  logo,
  isGrayTopbar,
  isCardShadow,
  isSquaredBorders,
  isBorderless,
  authPagesColor
}) => {
  return (
    <>{children}</>
  );
};

export default withRouter(connect(mapStateToProps)(AuthLayout));
