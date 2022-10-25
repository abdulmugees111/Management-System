import React, {Fragment, useEffect, useState, useLayoutEffect } from "react";
import PublicLayout from '../layout/Public'
import AuthLayout from '../layout/Auth'
import MainLayout from '../layout/Main'
import Project from '../layout/Project/index'
import Order from '../layout/Order/index'
import NProgress from 'nprogress'

import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user })

const Layouts = {
  public: PublicLayout,
  auth: AuthLayout,
  main: MainLayout,
  project: Project,
  order: Order,
}

let previousPath = '';

const Layout = ({ user, children, location: { pathname, search } }) => {

  // NProgress & ScrollTop Management
  const currentPath = pathname + search
  if (currentPath !== previousPath) {
    window.scrollTo(0, 0)
    NProgress.start()
  }
  setTimeout(() => {
    NProgress.done()
    previousPath = currentPath
  }, 300)

  // Layout Rendering
  const getLayout = () => {
    if (pathname === '/') {
      return 'main'
    }
    if (/^\/project(?=\/|$)/i.test(pathname)) {
      return 'project'
    }
    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      return 'auth'
    }
    if (/^\/order(?=\/|$)/i.test(pathname)) {
      return "order";
    }

    return 'main'
  }

  const Container = Layouts[getLayout()]
  const isUserAuthorized = user.authorized
  const isUserLoading = user.loading
  const isAuthLayout = getLayout() === 'auth'

  const BootstrappedLayout = () => {
    // show loader when user in check authorization process, not authorized yet and not on login pages
    if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
      return null
    }
    // redirect to login page if current is not login page and user not authorized
    if (!isAuthLayout && !isUserAuthorized) {
      return <Redirect to="/auth/login" />
    }
    // in other case render previously set layout
    return <Container>{children}</Container>
  }

  return (
    <Fragment>
      {/*<Helmet titleTemplate="Clean UI Pro React | %s" title="React Admin Template" />*/}
      {BootstrappedLayout()}
    </Fragment>
  );
};

export default withRouter(connect(mapStateToProps)(Layout))
