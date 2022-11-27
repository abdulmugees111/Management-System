import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";

import {
    Button,
} from "../../../components/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { post_ticket_message } from "../../../services/helpdesk/ticketDetails";

import { Div, Card, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const MessageReply = () => {
    const { ticket_id } = useParams();

    const useMessageReply = () => {
        const queryClient = useQueryClient();

        queryClient.setMutationDefaults(["post-reply"], {
            mutationFn: (data) => post_ticket_message(data),
            onMutate: async (variables) => {
                const { successCb, errorCb } = variables;
                return { successCb, errorCb };
            },
            onSuccess: (result, variables, context) => {
                if (context.successCb) {
                    context.successCb(result);
                }
            },
            onError: (error, variables, context) => {
                if (context.errorCb) {
                    context.errorCb(error);
                }
            },
        });
        return useMutation(["post-reply"]);
    };
    const messageReply = useMessageReply();

    const { errors, register, handleSubmit } = useForm();

    const [formData, setformData] = useState({
        message: ""
    })

    const onFormSubmit = (formData) => {
        messageReply.mutate({'ticket_id': ticket_id, 'message': formData.message})
    };



    return (<>
        {/* { */}
        {/* isLoading && <Spinner color="primary" /> */}
        {/* } */}
        {
            <div className="ticket-msg-reply ml-0">
                <h5 className="title">Reply</h5>
                <form onSubmit={handleSubmit(onFormSubmit)} id="message-form" className="form-reply">
                    <div className="form-group">
                        <div className="form-editor-custom">
                            <textarea
                                id="message"
                                name="message"
                                form="message-form"
                                className="form-control-lg form-control"
                                ref={register({ required: "This field is required" })}
                                required={true}
                                defaultValue={formData.message}
                                placeholder="Write a message..." />
                        </div>
                    </div>
                    <div className="form-action">
                        <ul className="form-btn-group">
                            <li>
                                <Button type="submit" color="primary" size="" className="btn-block">
                                    {messageReply.isLoading ? <Spinner size="" color="light" /> : "Send Reply"}
                                </Button>

                            </li>
                            <li className="form-btn-secondary">
                                <a href="#" className="btn btn-dim btn-outline-light">Mark as close</a>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        }
    </>
    )
}

export { MessageReply }