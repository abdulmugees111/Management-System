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
} from "../../../components/Component";
import { useQuery } from '@tanstack/react-query';
import { get_articles } from "../../../services/knowledge-base/articles";
import { Link, useParams } from "react-router-dom";
const Articles = () => {
    const { section_id } = useParams();
    const { isLoading, error, data: articles } = useQuery(["get-articles", section_id], () => get_articles(section_id));

    return (
        <React.Fragment>
            <Head title="Knowledge Base"></Head>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Knowledge Base - Articles</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>We are here to help you.</p>
                            </BlockDes>
                        </BlockHeadContent>

                    </BlockBetween>
                </BlockHead>

                <Block>
                    <Row className="g-gs">
                        <Col lg={6}>
                            {articles && articles.count > 0
                                ? articles.records.map((article) => {

                                    return (
                                        <Link to={`${process.env.PUBLIC_URL}/kb/article/${article.id}`} className="card card-bordered text-soft">
                                            <div className="card-inner">
                                                <div className="align-center justify-between">
                                                    <div className="g">
                                                        <h6 className="title">{article.name}</h6>
                                                        <p>{article.kanban_manual_description}</p>
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

export default Articles;