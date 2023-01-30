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
  const {t,i18n}=useTranslation(['help','common'])
  const { section_id } = useParams();
  const { isLoading, error, data: tickets } = useQuery(["get-tickets"], get_tickets);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  console.log("Data in tickets",tickets)
  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);


  return (
    <React.Fragment>
      <Head title="Tickets"></Head>
      <Content>
        <BlockHead size="sm" style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}}>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{t('helpdesk_tickets_title')}</BlockTitle>
              <BlockDes className="text-soft" style={{textAlign:i18n.language==="ar"?'right':'left'}}>
                <p style={{width:"fit-content"}}>{t('helpdesk_tickets_desc')}</p>
              </BlockDes>
            </BlockHeadContent>

            <BlockHeadContent>
              <ul className="nk-block-tools g-4 flex-wrap">
                <li className="order-md-last">
                  <Link to="/help/ticket/create" className="btn btn-white btn-dim btn-outline-primary">
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
                <table className="table table-tranx" style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}}>
                  <thead>
                  <tr className="tb-tnx-head">
                    <th className="" style={{textAlign: i18n.language === "ar" ? "right" : "left",padding:"20px"}}>
                      <span className="">{t('helpdesk_tickets_name_field')}</span>
                    </th>
                    <th className="" style={{textAlign: i18n.language === "ar" ? "right" : "left",padding:"20px"}}>
                      <span>{t('helpdesk_tickets_ticket_ref_field')}</span>
                    </th>
                    <th className="" style={{textAlign: i18n.language === "ar" ? "right" : "left",padding:"20px"}}>
                      <span className="tb-tnx-status d-none d-md-inline-block">{t('helpdesk_tickets_create_date_field')}</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {tickets && tickets.count > 0
                    ? tickets.records.map((ticket) => {
                      return (
                        <tr key={ticket.id} className="tb-tnx-item">
                          <td style={{textAlign: i18n.language === "ar" ? "right" : "left",padding:"20px"}}>
                            <a href={`/help/ticket/${ticket.id}`} >
                              <span > {ticket.name}</span>
                            </a>
                          </td>
                          <td className="tb-tnx-id" style={{textAlign: i18n.language === "ar" ? "right" : "left",padding:"20px"}}>
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