import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    Card,
    FormGroup,
    Modal,
    ModalBody,
    DropdownItem,
    Form,
    Badge,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardFooter
} from "reactstrap";
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
} from "../../../components/Component";
import { useQuery } from '@tanstack/react-query';
import { get_sections } from "../../../services/knowledge-base/sections";
import { Link } from "react-router-dom";
const Sections = () => {
    const { isLoading, error, data: sections } = useQuery(["get-sections"], get_sections);

    return (
        <React.Fragment>
            <Head title="Knowledge Base"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Knowledge Base - Sections</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>We are here to help you.</p>
                            </BlockDes>
                        </BlockHeadContent>

                    </BlockBetween>
                </BlockHead>

                <Block>
                <Row className="g-gs">
                        <Col lg={6}>
                            {sections && sections.count > 0
                                ? sections.records.map((section) => {

                                    return (
                                        <Link to={`${process.env.PUBLIC_URL}/kb/article/section/${section.id}`} className="card card-bordered text-soft">
                                            <div className="card-inner">
                                                <div className="align-center justify-between">
                                                    <div className="g">
                                                        <h6 className="title">{section.name}</h6>
                                                        <div dangerouslySetInnerHTML={{ __html: section.description }} />
                                                    </div>
                                                    <div className="g">
                                                        <span className="btn btn-icon btn-trigger mr-n1">
                                                            <Icon name="chevron-right"></Icon>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>{" "}
                                        </Link>
                                    )
                                }) : null}
                        </Col>
                    </Row>

                </Block>
            </Content>
        </React.Fragment>
    );
};

export default Sections;