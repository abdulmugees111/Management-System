import React from "react";

import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockHead, BlockHeadContent, BlockTitle, PreviewCard } from "../../../components/Component";
import { ReactComponent as ReactLogo } from "../../../assets/canceled.svg";

const PaymentCanceled = ({ ...props }) => {
  return (
    <React.Fragment>
      <Head title="Payment Failed" />
      <Content>
        <BlockHead size="lg" wide="xs" className="mx-auto">
          <BlockHeadContent className="text-center">
            <BlockTitle tag="h2" className="fw-normal">
              Payment Failed!
            </BlockTitle>
            {/* <BlockDes>
              <p className="lead">
                We love to share ideas! Visit our blog if you're looking for great articles or inspiration to get you
                going.
              </p>
            </BlockDes> */}
          </BlockHeadContent>
        </BlockHead>
        <Block>
          <PreviewCard bodyClass="card-inner-xl ">
            <article className="entry">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <ReactLogo />

                <h3>Your subscription could not succeed</h3>
                <p>
                  An error has occured while processing your payment or the payment is canceled intentionlly by user. If
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
