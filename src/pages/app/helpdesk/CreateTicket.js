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
import { Link } from "react-router-dom";
import { Card, Form, FormGroup, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";

const CreateTicket = () => {

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
      },
      onError: (error, variables, context) => {
        if (context.errorCb) {
          context.errorCb(error);
        }
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
              <BlockTitle page>Create Support Ticket</BlockTitle>
              <BlockDes className="text-soft">
                <p>We are here to help you.</p>
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
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                        type="text"
                        name="name"
                        placeholder="Jane Doe"
                        // required={true}
                        defaultValue={formData.name}

                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label"> Email </label>
                      <input
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                        type="email"
                        name="email"
                        placeholder="janedoe@gmail.com"
                        required={true}
                        defaultValue={formData.email}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Subject</label>
                      <input
                        className="form-control"
                        placeholder="I am having issue while connecting website"
                        ref={register({ required: "This field is required" })}
                        type="text"
                        name="subject"
                        required={true}
                      />
                      {errors.subject && <span className="invalid">{errors.subject.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Description</label>
                      <textarea
                        form="submit-ticket"
                        className="form-control"
                        ref={register({ required: "This field is required" })}
                        name="description"
                        placeholder="Add Your Description Here..."
                        required={true}
                      />
                      {errors.description && <span className="invalid">{errors.description.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button type="submit" color="primary" disabled={createTicket.isLoading} size="md">
                          {createTicket.isLoading ? <Spinner size="sm" color="light" /> : "Submit Ticket"}</Button>
                      </li>
                      <li>
                        <Link to="/help/tickets"
                              className="link link-light"
                        >
                          Cancel
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