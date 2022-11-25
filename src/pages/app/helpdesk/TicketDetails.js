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

const TicketDetails = () => {
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
                        <BlockHead size="sm">
                            <BlockBetween>
                                <BlockHeadContent>
                                    <BlockTitle >{ticket.name}</BlockTitle>
                                    <div class="nk-block">
                                        <div class="ticket-info">
                                            <ul class="ticket-meta">
                                                <li class="ticket-id">
                                                    <span>Ticket ID:</span> <strong>#{ticket.id}</strong>
                                                </li>
                                                <li class="ticket-date">
                                                    <span>Submitted:</span> <strong>{ticket.create_date}</strong>
                                                </li>
                                            </ul>
                                            <div class="ticket-status"><span class="badge badge-success">{ticket.stage_id[1]}</span>
                                            </div>
                                        </div>
                                    </div>
                                </BlockHeadContent>
                            </BlockBetween>
                        </BlockHead>
                        <Block>
                            <PreviewCard className="card-bordered">
                                <div>{ticket.description}</div>
                            </PreviewCard>
                        </Block>
                        <MessageBox ticket_id={ticket_id}/>
                    </>
                }
            </Content>
        </React.Fragment>
    );
};

export default TicketDetails;