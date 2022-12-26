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
  RSelect
} from "../../../components/Component";
import { useQuery } from "@tanstack/react-query";
import { get_tickets } from "../../../services/helpdesk/tickets";
import { Link, useParams } from "react-router-dom";
import { Card } from "reactstrap";
import { useTranslation } from "react-i18next";

const Tickets = () => {
  const {t}=useTranslation(['help','common'])
  const { section_id } = useParams();
  const { isLoading, error, data: tickets } = useQuery(["get-tickets"], get_tickets);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  return (
    <React.Fragment>
      <Head title="Knowledge Base"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>{t('helpdesk_tickets_title')}</BlockTitle>
              <BlockDes className="text-soft">
                <p>{t('helpdesk_tickets_desc')}</p>
              </BlockDes>
            </BlockHeadContent>

            <BlockHeadContent>
              <ul class="nk-block-tools g-4 flex-wrap">
                <li class="order-md-last">
                  <Link to="/help/ticket/create" class="btn btn-white btn-dim btn-outline-primary">
                    <span>{t('create_ticket_btn',{ns:'common'})}</span>
                  </Link>
                </li>
              </ul>
            </BlockHeadContent>

          </BlockBetween>
        </BlockHead>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">

              <div className="card-inner p-0">
                <table className="table table-tranx">
                  <thead>
                  <tr className="tb-tnx-head">
                    <th className="">
                      <span className="">{t('helpdesk_tickets_name_field')}</span>
                    </th>
                    <th className="">
                      <span>{t('helpdesk_tickets_ticket_ref_field')}</span>
                    </th>
                    <th className="">
                      <span className="tb-tnx-status d-none d-md-inline-block">{t('helpdesk_tickets_create_date_field')}</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {tickets && tickets.count > 0
                    ? tickets.records.map((ticket) => {
                      return (
                        <tr key={ticket.id} className="tb-tnx-item">
                          <td>
                            <a href={`/help/ticket/${ticket.id}`}>
                              <span>{ticket.name}</span>
                            </a>
                          </td>
                          <td className="tb-tnx-id">
                            <span>{ticket.id}</span>
                          </td>
                          <td></td>
                        </tr>
                      );
                    })
                    : null}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Tickets;