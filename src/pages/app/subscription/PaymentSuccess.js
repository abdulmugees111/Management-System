import React from "react";

import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockDes, BlockHead, BlockHeadContent, BlockTitle, PreviewCard } from "../../../components/Component";
import { ReactComponent as ReactLogo } from "../../../assets/checkmark.svg";

const PaymentSuccess = ({ ...props }) => {
  return (
    <React.Fragment>
      <Head title="Payment Success" />
      <Content>
        <BlockHead size="lg" wide="xs" className="mx-auto">
          <BlockHeadContent className="text-center">
            <BlockTitle tag="h2" className="fw-normal">
              Payment Success!
            </BlockTitle>
          </BlockHeadContent>
        </BlockHead>
        <Block>
          <PreviewCard bodyClass="card-inner-xl ">
            <article className="entry">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <ReactLogo />
                <h3>Your subscription has been added successfully</h3>
                <p>
                  Please sit back and wait a while. We&apos;ll send you intimation at your registered email shortly.
                </p>
              </div>
            </article>
          </PreviewCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default PaymentSuccess