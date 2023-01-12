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
  RSelect, BackTo
} from "../../../components/Component";
import { useQuery } from "@tanstack/react-query";
import { get_articles } from "../../../services/knowledge-base/articles";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";

const Articles = () => {
  const { section_id } = useParams();
  const { isLoading, error, data: articles } = useQuery(["get-articles", section_id], () => get_articles(section_id));
  const { t,i18n } = useTranslation(['knowledge_base', 'common'])

  return (
    <React.Fragment>
      {
        isLoading && <Spinner color="primary" />
      }

      <Head title="Help Articles" />
      {articles &&
        <Content>
          <Block>
            <BlockHead size="sm" style={{ display: "flex", flexDirection: i18n.language === "ar" ? "row-reverse" : "row" }}>
              <BlockBetween>
                <BlockHeadContent style={{display:"flex",flexDirection:"column",alignItems:i18n.language === "ar" ?"flex-end":"flex-start"}} >
                  <BackTo link="/knowledge-base" icon={i18n.language === "ar" ?"arrow-right":"arrow-left"}>
                  {t('sections')}
                  </BackTo>
                  <BlockTitle page tag="h3" style={{ textAlign: i18n.language === "ar" ? "right" : "left" }}>
                    {articles.section.name}
                  </BlockTitle>
                  <BlockDes className="text-soft">
                    <div dangerouslySetInnerHTML={{ __html: articles.section.description }} />
                  </BlockDes>
                </BlockHeadContent>
              </BlockBetween>
            </BlockHead>
          </Block>

          <Block>
            <div className="card card-bordered">
              <div className="card-inner">
                {articles && articles.count > 0
                  ? articles.records.map((article, idx) => {
                    return (
                      <div key={idx} class="support-queue-item">
                        <Link className="support-queue-link" to={`${process.env.PUBLIC_URL}/kb/article/${article.id}`} style={{ display: "flex", flexDirection: i18n.language === "ar" ? "row-reverse" : "row", justifyContent: "space-between" }}>
                          <div class="support-queue-media" style={{ marginLeft: i18n.language === "ar" ? "1rem" : "0rem"}}><em
                            class="icon icon-circle ni ni-cc-secure bg-warning"></em></div>
                          <div class="support-queue-body" style={{ display: "flex", flexGrow: 1, flexDirection: i18n.language === "ar" ? "row-reverse" : "row", justifyContent: "space-between" }}>
                            <div class="support-queue-context"><h5 class="support-queue-title title">{article.name}</h5>
                              <div class="support-queue-desc">{article.kanban_manual_description}</div>
                            </div>
                            <div class="support-queue-update" style={{marginLeft:"0px"}}><span>Updated: {article.write_revision_date}</span></div>
                          </div>
                        </Link></div>
                    );

                  }) : null}
              </div>
            </div>
          </Block>
        </Content>
      }
    </React.Fragment>
  );
};

export default Articles;