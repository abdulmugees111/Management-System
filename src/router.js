import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from './layout/Index'
import { Button} from "./components/Component";
import { useTranslation } from 'react-i18next'

function ErrorFallback({ error, resetErrorBoundary }) {
  const {t}=useTranslation(['notification'])
  return (
    <div role="alert">
      <p>{t('something_wrong')}:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary} type="button">
      {t('try_again')}
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
    path: "/project/:app_name",
    Component: lazy(() => import("./pages/app/projects/ProjectDetails")),
    exact: true,
  },
  {
    path: "/project/:app_name/overview",
    Component: lazy(() => import("./pages/app/projects/ProjectDetails")),
    exact: true,
  },
  {
    path: "/project/:app_name/domain-ssl",
    Component: lazy(() => import("./pages/app/projects/domain/Domain")),
    exact: true,
  },
  {
    path: "/project/:app_name/settings",
    Component: lazy(() => import("./pages/app/projects/app-settings/Settings")),
    exact: true,
  },
  {
    path: "/",
    Component: lazy(() => import("./pages/app/user/Dashboard")),
    exact: true,
  },
  {
    path: "/dashboard",
    Component: lazy(() => import("./pages/app/user/Dashboard")),
    exact: true,
  },
  {
    path: "/invoices",
    Component: lazy(() => import("./pages/app/payment-history/PaymentHistory")),
    exact: true,
  },
  {
    path: "/invoice/:invoice_id",
    Component: lazy(() => import("./pages/app/payment-history/InvoiceDetails")),
    exact: true,
  },
  {
    path: "/knowledge-base",
    Component: lazy(() => import("./pages/app/knowledge-base/Sections")),
    exact: true,
  },
  {
    path: "/kb/article/:article_id",
    Component: lazy(() => import("./pages/app/knowledge-base/Article")),
    exact: true,
  },
  {
    path: "/kb/article/section/:section_id",
    Component: lazy(() => import("./pages/app/knowledge-base/Articles")),
    exact: true,
  },
  {
    path: "/help/tickets",
    Component: lazy(() => import("./pages/app/helpdesk/Tickets")),
    exact: true,
  },
  {
    path: "/help/ticket/create",
    Component: lazy(() => import("./pages/app/helpdesk/CreateTicket")),
    exact: true,
  },
  {
    path: "/help/ticket/:ticket_id",
    Component: lazy(() => import("./pages/app/helpdesk/TicketDetails")),
    exact: true,
  },
  {
    path: "/account-settings",
    Component: lazy(() => import("./pages/app/user/AccountSettings")),
    exact: true,
  },
  {
    path: "/user-profile",
    Component: lazy(() => import("./pages/app/user/UserProfile")),
    exact: true,
  },
  // {
  //   path: '/project/:id',
  //   Component: lazy(() => import('./pages/projects/ProjectDetails')),
  //   exact: true,
  // },
  {
    path: "/projects",
    Component: lazy(() => import("./pages/app/projects/Projects")),
    exact: true,
  },
  {
    path: "/pricing",
    Component: lazy(() => import("./pages/app/subscription/Pricing")),
    exact: true,
  },
  {
    path: "/domain-ssl",
    Component: lazy(() => import("./pages/app/projects/domain/Domain")),
    exact: true,
  },
  {
    path: "/subscription",
    Component: lazy(() => import("./pages/app/subscription/Subscription")),
    exact: true,
  },
  {
    path: "/order",
    Component: lazy(() => import("./pages/app/subscription/OrderPage")),
    exact: true,
  },
  {
    path: "/payment-history",
    Component: lazy(() => import("./pages/app/payment-history/PaymentHistory")),
    exact: true,
  },
  // Auth Pages

  {
    path: "/auth/login/profile",
    Component: lazy(() => import("./layout/header/dropdown/user/User")),
    exact: true,
  
  },
  {
    path: "/auth/login",
    Component: lazy(() => import("./pages/auth/Login")),
    exact: true,
  },
  {
    path: "/auth/success",
    Component: lazy(() => import("./pages/auth/Success")),
    exact: true,
  },
  {
    path: "/payment/success",
    Component: lazy(() => import("./pages/app/subscription/PaymentSuccess")),
    exact: true,
  },
  {
    path: "/payment/canceled",
    Component: lazy(() => import("./pages/app/subscription/PaymentCanceled")),
    exact: true,
  },

  // {
  //   path: '/auth/forgot-password',
  //   Component: lazy(() => import('pages/auth/forgot-password')),
  //   exact: true,
  // },
  {
    path: "/auth/register",
    Component: lazy(() => import("./pages/auth/Register")),
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
];

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  // const { t, i18n } = useTranslation();
  // document.body.dir = i18n.dir();
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
