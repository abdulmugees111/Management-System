import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";

import { Button } from "../../../components/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { post_ticket_message } from "../../../services/helpdesk/ticketDetails";

import { Div, Card, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { close_ticket } from "../../../services/helpdesk/tickets";

const MessageReply = () => {
  
  const { t,i18n } = useTranslation("help");
  const { ticket_id } = useParams();

  const useMessageReply = () => {
    const queryClient = useQueryClient();

    queryClient.setMutationDefaults(["post-reply"], {
      mutationFn: (data) => post_ticket_message(data),
      onMutate: async (variables) => {
        console.log("Post reply mutate",{variables})
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
      onSettled: () => {
        console.log('settling')
        queryClient.invalidateQueries(["get-ticket", ticket_id])
      }
    });
    return useMutation(["post-reply"]);
  };
  const useCloseTicket = () => {
    const queryClient = useQueryClient();

    queryClient.setMutationDefaults(["close-ticket"], {
      mutationFn: (ticketId) => close_ticket(ticketId),
      onMutate: async (variables) => {
        console.log({variables})
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
      onSettled: () => {
        console.log('settling')
        queryClient.invalidateQueries(["get-ticket", ticket_id])
      }
    });
    return useMutation(["close-ticket"]);
  };
  const messageReply = useMessageReply();
  const closeTicket = useCloseTicket();

  const { errors, register, handleSubmit } = useForm();

  const [formData, setformData] = useState({
    message: "",
    closeTicket:false
  });

  const onFormSubmit = async (formData) => {
    messageReply.mutate({'ticket_id': ticket_id, 'message': formData.message})

    console.log("Form data is", formData);
    // closeTicket.mutate()
  };
const handleTicketClose=()=>{
  console.log({ticket_id})
     closeTicket.mutate(ticket_id)
}
  return (
    <>
      {/* { */}
      {/* isLoading && <Spinner color="primary" /> */}
      {/* } */}
      {
        <div className="ticket-msg-reply ml-0">
          <h5 className="title" style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{t("reply")}</h5>
          <form onSubmit={handleSubmit(onFormSubmit)} id="message-form" className="form-reply">
            <div className="form-group">
              <div className="form-editor-custom">
                <textarea style={{direction: i18n.language === "ar" ? "rtl" : "ltr",}}
                  id="message"
                  name="message"type="submit"
                  form="message-form"
                  className="form-control-lg form-control"
                  ref={register({ required: t("field_required_error", { ns: "common" }) })}
                  required={true}
                  defaultValue={formData.message}
                  placeholder={t("write_msg")}
                />
              </div>
            </div>
            <div className="form-action">
              <ul className="form-btn-group" >
                <li>
                  <Button type="submit" color="primary" size="" className="btn-block">
                    {messageReply.isLoading ? <Spinner size="" color="light" /> : t("send_reply_btn")}
                  </Button>
                </li>
                <li className="form-btn-secondary">
                  <Button onClick={handleTicketClose} type="button" color="outline-light" size="" className="btn-block">
                    {closeTicket.isLoading ? <Spinner size="" color="light" /> : t("mark_as_close_btn")}
                  </Button>
                  {/* <a href="#" className="btn btn-dim btn-outline-light">{t('mark_as_close_btn')}</a> */}
                </li>
              </ul>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export { MessageReply };
