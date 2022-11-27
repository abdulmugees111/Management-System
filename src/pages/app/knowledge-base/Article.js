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
    PreviewCard, BackTo
} from "../../../components/Component";
import { useQuery } from '@tanstack/react-query';
import { get_article } from "../../../services/knowledge-base/article";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
const Article = () => {
    const { article_id } = useParams();
    const { isLoading, error, data: article } = useQuery(["get-article", article_id], () => get_article(article_id));
    return (
        <React.Fragment>
            <Head title="Knowledge Base"></Head>

            {
                isLoading && <Spinner color="primary" />
            }
            {
                article !== undefined &&
                <Content>
                    <Block>
                        <BlockHead size="sm">
                            <BlockBetween>
                                <BlockHeadContent>
                                    <BackTo link={`/kb/article/section/${article.section_id[0]}`} icon="arrow-left">
                                        {article.section_id[1]}
                                    </BackTo>
                                    <BlockTitle page>{article.name}</BlockTitle>
                                    <BlockDes className="text-soft">
                                        <p>{article.kanban_manual_description}</p>
                                    </BlockDes>
                                </BlockHeadContent>
                            </BlockBetween>
                        </BlockHead>
                    </Block>

                    <Block>
                        <PreviewCard className="card-bordered">
                            <div className="entry">
                                <div dangerouslySetInnerHTML={{ __html: article.description_arch }} />
                            </div>
                        </PreviewCard>
                    </Block>

                </Content>
            }
        </React.Fragment>
    );
};

export default Article;