import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
} from "../../../components/Component";
import { useQuery } from "@tanstack/react-query";
import { get_sections } from "../../../services/knowledge-base/sections";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

const Sections = () => {
  const { isLoading, error, data: sections } = useQuery(["get-sections"], get_sections);

  return (
    <React.Fragment>
      <Head title="Knowledge Base"></Head>
      <Content>
        <div class="nk-block-head wide-md nk-block-head-lg">
          <div class="nk-block-head-sub"><span>Knowledge Base</span></div>
          <div class="nk-block-head-content"><h2 class="nk-block-title fw-normal">Hi! How can we help?</h2>
            <p>If you have any problem have a look in our knowledge base support.</p>
            <div class="nk-search-box">
              <div class="form-group">
                <div class="form-control-wrap"><input type="text"
                                                      className="form-control form-control-lg"
                                                      placeholder="Search... (Comming Soon)"></input>
                  <button className="form-icon form-icon-right"><em class="icon ni ni-search"></em>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Block>
          {
            isLoading && <Spinner color="primary" />
          }
          {sections && sections.count > 0
            ? sections.records.map((section) => {

              return (
                <div class="support-topic-item card card-bordered">
                  <Link to={`${process.env.PUBLIC_URL}/kb/article/section/${section.id}`}
                        className="support-topic-block card-inner">
                    <div class="support-topic-media">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
                        <path
                          d="M63.42,87H10.58A4.08,4.08,0,0,1,6.5,82.92V7.08A4.08,4.08,0,0,1,10.58,3H48.32L67.5,21.23V82.92A4.08,4.08,0,0,1,63.42,87ZM47.5,3V16.92A4,4,0,0,0,51.38,21H66.5"
                          fill="#fff" stroke="#6576ff" stroke-linecap="round"
                          stroke-miterlimit="10" stroke-width="2"></path>
                        <circle cx="63.5" cy="67" r="20" fill="#6576ff"></circle>
                        <path
                          d="M61.87,71a6.83,6.83,0,0,1,.39-2.55,6.71,6.71,0,0,1,1.51-2.09,11.82,11.82,0,0,0,1.44-1.61,2.92,2.92,0,0,0,.47-1.59,2.47,2.47,0,0,0-.55-1.72,2,2,0,0,0-1.58-.6,2.22,2.22,0,0,0-1.61.59A2,2,0,0,0,61.33,63H58.5a4.39,4.39,0,0,1,1.4-3.37,5.27,5.27,0,0,1,3.65-1.24,5.09,5.09,0,0,1,3.64,1.23,4.48,4.48,0,0,1,1.31,3.43,5.69,5.69,0,0,1-1.77,3.86L65.3,68.37A4.08,4.08,0,0,0,64.51,71Zm-.3,3.17A1.6,1.6,0,0,1,62,73,1.69,1.69,0,0,1,65,74.17a1.65,1.65,0,0,1-.44,1.17,1.67,1.67,0,0,1-1.26.46A1.62,1.62,0,0,1,62,75.34,1.65,1.65,0,0,1,61.57,74.17Z"
                          fill="#fff"></path>
                        <circle cx="17" cy="21.5" r="4.5" fill="none" stroke="#6576ff"
                                stroke-miterlimit="10" stroke-width="2"></circle>
                        <line x1="28.5" y1="20" x2="36.5" y2="20" fill="none" stroke="#6576ff"
                              stroke-miterlimit="10" stroke-width="2"></line>
                        <line x1="28.5" y1="24" x2="43.5" y2="24" fill="none" stroke="#6576ff"
                              stroke-miterlimit="10" stroke-width="2"></line>
                        <circle cx="17" cy="39.5" r="4.5" fill="none" stroke="#6576ff"
                                stroke-miterlimit="10" stroke-width="2"></circle>
                        <line x1="28.5" y1="37" x2="36.5" y2="37" fill="none" stroke="#6576ff"
                              stroke-miterlimit="10" stroke-width="2"></line>
                        <line x1="28.5" y1="42" x2="43.5" y2="42" fill="none" stroke="#6576ff"
                              stroke-miterlimit="10" stroke-width="2"></line>
                        <circle cx="17" cy="56.5" r="4.5" fill="none" stroke="#6576ff"
                                stroke-miterlimit="10" stroke-width="2"></circle>
                        <line x1="28.5" y1="54" x2="36.5" y2="54" fill="none" stroke="#6576ff"
                              stroke-miterlimit="10" stroke-width="2"></line>
                        <line x1="28.5" y1="59" x2="43.5" y2="59" fill="none" stroke="#6576ff"
                              stroke-miterlimit="10" stroke-width="2"></line>
                      </svg>
                    </div>
                    <div class="support-topic-context"><h5
                      class="support-topic-title title">{section.name}</h5>
                      <div dangerouslySetInnerHTML={{ __html: section.description }} class="support-topic-info" />
                      {/*<div class="support-topic-count">Here are 7 questions and answers.</div>*/}
                    </div>
                    <div class="support-topic-action"><em class="icon ni ni-chevron-right"></em>
                    </div>
                  </Link>
                </div>
              );
            }) : null}
        </Block>
        <div class="nk-block nk-block-lg">
          <div class="card card-bordered border-primary">
            <div class="card-inner">
              <div class="nk-cta">
                <div class="nk-cta-block">
                  <div class="nk-cta-img"><em class="icon icon-circle ni ni-msg"></em></div>
                  <div class="nk-cta-text"><p>If you don’t find your question please contact our support team.</p></div>
                </div>
                <div class="nk-cta-action">
                  <Link to="/help/ticket/create" className="btn btn-primary">Contact Us</Link></div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default Sections;