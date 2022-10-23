import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from './layout/Index'
import { Button} from "./components/Component";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary} type="button">
        Try again
      </Button>
    </div>
  )
}
const myErrorHandler = (error, info) => {
  console.error(error)
  console.log(info)
  // Do something with the error
  // E.g. log to an error logging client here
}

const routes = [
  // Dashboards
  {
    path: '/project/:app_name',
    Component: lazy(() => import('./pages/app/projects/ProjectDetails')),
    exact: true,
  },
  {
    path: '/project/:app_name/overview',
    Component: lazy(() => import('./pages/app/projects/ProjectDetails')),
    exact: true,
  },
  {
    path: '/project/:app_name/domain-ssl',
    Component: lazy(() => import('./pages/app/projects/domain/Domain')),
    exact: true,
  },
  {
    path: '/project/:app_name/settings',
    Component: lazy(() => import('./pages/app/projects/app-settings/Settings')),
    exact: true,
  },
  {
    path: '/',
    Component: lazy(() => import('./pages/app/user/Dashboard')),
    exact: true,
  },
  {
    path: '/dashboard',
    Component: lazy(() => import('./pages/app/user/Dashboard')),
    exact: true,
  },
  {
    path: '/invoices',
    Component: lazy(() => import('./pages/app/payment-history/PaymentHistory')),
    exact: true,
  },
  {
    path: '/account-settings',
    Component: lazy(() => import('./pages/app/user/AccountSettings')),
    exact: true,
  },
  {
    path: '/user-profile',
    Component: lazy(() => import('./pages/app/user/UserProfile')),
    exact: true,
  },
  // {
  //   path: '/project/:id',
  //   Component: lazy(() => import('./pages/projects/ProjectDetails')),
  //   exact: true,
  // },
  {
    path: '/projects',
    Component: lazy(() => import('./pages/app/projects/Projects')),
    exact: true,
  },
  {
    path: '/pricing',
    Component: lazy(() => import('./pages/app/subscription/Pricing')),
    exact: true,
  },
  {
    path: '/domain-ssl',
    Component: lazy(() => import('./pages/app/projects/domain/Domain')),
    exact: true,
  },
  {
    path: '/subscription',
    Component: lazy(() => import('./pages/app/subscription/Subscription')),
    exact: true,
  },
  {
    path: '/payment-history',
    Component: lazy(() => import('./pages/app/payment-history/PaymentHistory')),
    exact: true,
  },
  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('./pages/auth/Login')),
    exact: true,
  },
  // {
  //   path: '/auth/forgot-password',
  //   Component: lazy(() => import('pages/auth/forgot-password')),
  //   exact: true,
  // },
  {
    path: '/auth/register',
    Component: lazy(() => import('./pages/auth/Register')),
    exact: true,
  },
  // {
  //   path: '/auth/404',
  //   Component: lazy(() => import('pages/auth/404')),
  //   exact: true,
  // },
  // {
  //   path: '/auth/500',
  //   Component: lazy(() => import('pages/auth/500')),
  //   exact: true,
  // },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={state => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>

                    {/* <Route exact path="/" render={() => <Redirect to="/" />} /> */}

                    {routes.map(({ path, Component, exact }) => (

                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div >
                              <Suspense fallback={null}>
                                <ErrorBoundary
                                  FallbackComponent={ErrorFallback}
                                  onReset={() => {
                                    // reset the state of your app so the error doesn't happen again
                                  }}
                                  onError={myErrorHandler}
                                >
                                  <Component history={history} />
                                </ErrorBoundary>
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
