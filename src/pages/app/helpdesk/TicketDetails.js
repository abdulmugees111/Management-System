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
import { MessageBox } from "./MessageBox";
import { MessageReply } from "./MessageReply";
import { useQuery } from '@tanstack/react-query';
import { get_ticket, get_ticket_messages } from "../../../services/helpdesk/ticketDetails";
import { Link, useParams } from "react-router-dom";
import { Card, Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";

const TicketDetails = () => {
    const {t,i18n}=useTranslation(['help'])
    const { ticket_id } = useParams();
    const { isLoading, error, data: ticket } = useQuery(["get-ticket", ticket_id], () => get_ticket(ticket_id));
    return (
        <React.Fragment>
            <Head title="Knowledge Base"></Head>
            <Content>
                {
                    isLoading && <Spinner color="primary" />
                }
                {ticket !== undefined &&
                    <>
                        <BlockHead size="sm" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
                            <BlockBetween>
                                <BlockHeadContent>
                                    <BlockTitle style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{ticket.name}</BlockTitle>
                                    <div className="nk-block" >
                                        <div className="ticket-info" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
                                            <ul className="ticket-meta" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
                                                <li className="ticket-id" style={{paddingRight:"0px"}}>
                                                    <span style={{textAlign: i18n.language === "ar" ? "right" : "left"}}> {t("ticket_id", { id: ticket.id })}</span> 
                                                </li>
                                                <li className="ticket-date" style={{paddingRight:"0px"}}>
                                                    <span style={{textAlign: i18n.language === "ar" ? "right" : "left",padding:"20px"}}>{t('submitted')}:</span> <strong>{ticket.create_date}</strong>
                                                </li>
                                            </ul>
                                            <div className="ticket-status"><span className="badge badge-success" style={{margin:"0px 10px"}}>{ticket.stage_id[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </BlockHeadContent>
                            </BlockBetween>
                        </BlockHead>
                        <Block>
                            <PreviewCard className="card-bordered">
                                <div style={{textAlign: i18n.language === "ar" ? "right" : "left",padding:"20px"}}>{ticket.description}</div>
                            </PreviewCard>
                        </Block>
                        <MessageBox ticket_id={ticket_id} stage={ticket.stage_id}/>
                    </>
                }
            </Content>
        </React.Fragment>
    );
};

export default TicketDetails;