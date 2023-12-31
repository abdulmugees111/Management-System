import React from "react";

import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockHead, BlockHeadContent, BlockTitle, PreviewCard } from "../../../components/Component";
import { ReactComponent as ReactLogo } from "../../../assets/canceled.svg";

const PaymentCanceled = () => {
  return (
    <React.Fragment>
      <Head title="Payment Failed" />
      <Content>
        <BlockHead size="lg" wide="xs" className="mx-auto">
          <BlockHeadContent className="text-center">
            <BlockTitle tag="h2" className="fw-normal">
              Payment Failed!
            </BlockTitle>
          </BlockHeadContent>
        </BlockHead>
        <Block>
          <PreviewCard bodyClass="card-inner-xl ">
            <article className="entry">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <ReactLogo />
                <h3>Your subscription could not succeed</h3>
                <p>
                  An error has occurred while processing your payment or the payment is canceled intentionally by user. If
                  you are experiencing this issue again and again please contact us through email.
                </p>
              </div>
            </article>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default PaymentCanceled
