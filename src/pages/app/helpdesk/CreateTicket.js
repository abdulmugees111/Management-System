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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_ticket } from "../../../services/helpdesk/tickets";
import { Link, useHistory } from "react-router-dom";
import { Card, Form, FormGroup, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { get_user_data } from "../../../services/user";

const CreateTicket = () => {
  const {
    isLoading,
    error,
    data,
    refetch: getUserRefetch,
  } = useQuery(["get-user-data"], get_user_data, {
    onSuccess: (data) => {
      if (data) {
        setFormData({
          ...(delete data.id && data),
        });
      }
    },
    onError: () => toast.error(t('processing_request_error_nt',{ns:'notification'})),
  });
  console.log("data",data)

  const {t}=useTranslation(['help','common','notification'])
  const history = useHistory();

  const useCreateTicket = () => {
    const queryClient = useQueryClient();

    queryClient.setMutationDefaults(["create-ticket"], {
      mutationFn: (data) => create_ticket(data),
      onMutate: async (variables) => {
        const { successCb, errorCb } = variables;
        return { successCb, errorCb };
      },
      onSuccess: (result, variables, context) => {
        if (context.successCb) {
          context.successCb(result);
        }
        toast.success(t('ticket_created_nt',{ns:'notification'}));
        history.push('/help/tickets')
      },
      onError: (error, variables, context) => {
        if (context.errorCb) {
          context.errorCb(error);
        }
        toast.error(t('ticket_created_error_nt',{ns:'notification'}));

      },
    });
    return useMutation(["create-ticket"]);
  };

  const createTicket = useCreateTicket();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: ""
  });

  const { errors, register, handleSubmit } = useForm();

  const onFormSubmit = (formData) => {
    createTicket.mutate(formData)
  };


  return (
    <React.Fragment>
      <Head title="Submit Ticket"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>{t('create_ticket_title',{ns:'help'})}</BlockTitle>
              <BlockDes className="text-soft">
                <p>{t('create_ticket_desc',{ns:'help'})}</p>
              </BlockDes>
            </BlockHeadContent>

          </BlockBetween>
        </BlockHead>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="p-2">
              <div className="mt-4">
                <Form className="row gy-4" id="submit-ticket" onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">{t('name',{ns:'common'})}</label>
                      <input
                        className="form-control"
                        ref={register({ required: t('field_required_error',{ns:"common"}) })}
                        type="text"
                        name="name"
                        placeholder={data?.name?data?.name:t('name_ph',{ns:'common'})}
                        // required={true}
                        defaultValue={formData.name}

                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label"> {t('email',{ns:'common'})} </label>
                      <input
                        className="form-control"
                        ref={register({ required: t('field_required_error',{ns:"common"}) })}
                        type="email"
                        name="email"
                        placeholder={data?.email?data?.email:"janedoe@gmail.com"}
                        required={true}
                        defaultValue={formData.email}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">{t('subject',{ns:'common'})}</label>
                      <input
                        className="form-control"
                        placeholder={t('subject_ph',{ns:'common'})}
                        ref={register({ required: t('field_required_error',{ns:"common"}) })}
                        type="text"
                        name="subject"
                        required={true}
                      />
                      {errors.subject && <span className="invalid">{errors.subject.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">{t('description',{ns:'common'})}</label>
                      <textarea
                        form="submit-ticket"
                        className="form-control"
                        ref={register({ required: t('field_required_error',{ns:"common"}) })}
                        name="description"
                        placeholder={t('description_ph',{ns:'common'})}
                        required={true}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button type="submit" color="primary" disabled={createTicket.isLoading} size="md">
                          {createTicket.isLoading ? <Spinner size="sm" color="light" /> : t('submit_ticket_btn',{ns:'common'})}</Button>
                      </li>
                      <li>
                        <Link to="/help/tickets"
                              className="link link-light"
                        >
                          {t('cancel_btn',{ns:'common'})}
                        </Link>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </Card>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default CreateTicket;