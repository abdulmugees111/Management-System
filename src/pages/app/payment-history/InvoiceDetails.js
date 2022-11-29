import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";

import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  PaginationComponent,
  Row,
  RSelect,
  PreviewCard,
} from "../../../components/Component";
import { useQuery } from '@tanstack/react-query';
import { get_invoice } from "../../../services/invoice/index";
import { Link, useParams } from "react-router-dom";
import { Card, Spinner } from "reactstrap";

const InvoiceDetails = () => {
  const { invoice_id } = useParams();
  const { isLoading, error, data: invoice } = useQuery(["get-invoice", invoice_id], () => get_invoice(invoice_id));
  return (
    <React.Fragment>
      <Head title="Invoice Details"></Head>
      <Content>
        {
          isLoading && <Spinner color="primary" />
        }
        {invoice !== undefined &&
          <>
            <BlockHead size="sm">
              <BlockBetween>
                <BlockHeadContent>
                  <BlockTitle>Invoice Details</BlockTitle>
                </BlockHeadContent>
              </BlockBetween>
            </BlockHead>
            <Block>
              <PreviewCard className="card-bordered">
                <div dangerouslySetInnerHTML={{ __html: invoice.record }} />

              </PreviewCard>
            </Block>
          </>
        }
      </Content>
    </React.Fragment>
  );
};

export default InvoiceDetails;