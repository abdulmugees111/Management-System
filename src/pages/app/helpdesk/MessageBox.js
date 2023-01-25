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
  PreviewCard
} from "../../../components/Component";
import { useQuery } from "@tanstack/react-query";
import { get_ticket_messages } from "../../../services/helpdesk/ticketDetails";
import { Div, Card, Spinner } from "reactstrap";
import { MessageReply } from "./MessageReply";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { close_ticket } from "../../../services/helpdesk/tickets";
import i18next from "i18next";

const MessageBox = ({ ticket_id, stage, ...props }) => {

  const {t, i18n}=useTranslation(['help'])
  const {
    isLoading,
    error,
    data: messages
  } = useQuery(["get-messages", ticket_id], () => get_ticket_messages(ticket_id));
  
  return (<Block>
      <PreviewCard className="card-bordered">

        {
          isLoading && <Spinner color="primary" />
        }
        {messages && messages.count > 0
          ? messages.records.map((message,idx) => {
            return (
              <div  style={{direction: i18n.language === "ar" ? "rtl" : "ltr" }} key={idx} className="ticket-msg-item  pt-0 mt-2" >
                <div className="ticket-msg-from">
                  <div className="ticket-msg-user user-card">
                    <div className="user-avatar bg-primary">
                      {/* <span>KA</span> */}
                    </div>
                    <div className="user-info">
                      <span style={{ marginRight:i18n.language === "ar" ? "0.6rem" : "0rem" }} className="lead-text">{message.author_id[1]}</span>
                      {/* <span className="text-soft">Customer</span> */}
                    </div>
                  </div>
                  <div className="ticket-msg-date">
                    <span className="sub-text">{message.date}</span>
                  </div>
                </div>
                <div style={{ marginRight:i18n.language === "ar" ? "3rem" : "0rem" ,width:"fit-content",textAlign: i18n.language === "ar" ? "right" : "left" }} className="ticket-msg-comment">
                  <div  dangerouslySetInnerHTML={{ __html: message.body }} />
                </div>
              </div>
          )
          }) : null
        }
        {
          i18next.language === "en" ? 
          (stage[1] === "New" || stage[1] === "In Progress") ? <MessageReply ticket_id={ticket_id} /> : <h3>{t('cant_send_msg_error')}</h3>
        : 
          (stage[1] === "جديد" || stage[1] === "في تَقَدم") ? <MessageReply ticket_id={ticket_id} /> : <h3>{t('cant_send_msg_error')}</h3>
        

          
        }


        {/* {
          (stage[1] === "New" || stage[1] === "جديد") ? <MessageReply ticket_id={ticket_id} /> : <h3>{t('cant_send_msg_error')}</h3>
        } */}
      </PreviewCard>
    </Block>
  );
};

export { MessageBox };