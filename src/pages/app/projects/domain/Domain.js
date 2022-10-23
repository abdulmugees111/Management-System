import React, { useState } from "react";
import { connect } from "react-redux";
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import {
  BackTo,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../../../components/block/Block";

import { Card, Spinner, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { getProjectDomains } from "../../../../services/projects";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Icon } from "../../../../components/Component";

const mapStateToProps = ({ domain }) => ({
  domain,
});

const Domain = ({ domain }) => {
  const [sm, updateSm] = useState(false);

  const { app_name } = useParams();
  const { isLoading, error, data } = useQuery(["get-project-domain", app_name], () => getProjectDomains(app_name));

  return (
    <React.Fragment>
      <Head title="Homepage"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BackTo link="/projects" icon="arrow-left">
                Subscriptions
              </BackTo>
              <BlockTitle page tag="h3">
                Domain(s) and SSL Settings
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>Connect your Custom Domain</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt"></li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        {isLoading ? (
          <Spinner color="primary" />
        ) : error ? (
          <>Error..</>
        ) : (
          <Block>
            <Card className="card-bordered card-stretch">
              <div className="card-inner-group">
                <div className="card-inner p-0">
                  <table className="table table-tranx">
                    <thead>
                      <tr className="tb-tnx-head">
                        {/* <th className="tb-tnx-id">
                            <span className="">id</span>
                          </th> */}
                        <th className="tb-tnx-info">
                          <span className="tb-tnx-desc d-none d-sm-inline-block">
                            <span>Name</span>
                          </span>
                          <span className="tb-tnx-desc d-none d-sm-inline-block">
                            <span>SSL</span>
                          </span>
                        </th>
                       <th className="tb-tnx-action">
                        <span>&nbsp;</span>
                      </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.count > 0
                        ? data.results.map((item,i) => {
                            return (
                              <tr key={i} className="tb-tnx-item">
                                {/* <td className="tb-tnx-id">
                                    <span>{item.id}</span>
                                  </td> */}
                                <td className="tb-tnx-info">
                                  <div className="tb-tnx-desc">
                                    <span className="title">{item.name}</span>
                                  </div>
                                  <div className="tb-tnx-desc">
                                    <span className="title">{!!item.ssl ? "true" : "false"}</span>
                                  </div>
                                </td>
                                <td className="tb-tnx-action">
                                  <UncontrolledDropdown>
                                    <DropdownToggle
                                      tag="a"
                                      className="text-soft dropdown-toggle btn btn-icon btn-trigger"
                                    >
                                      <Icon name="more-h"></Icon>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                      <ul className="link-list-plain">
                                        <li
                                          onClick={() => {
                                            loadDetail(item.id);
                                            setViewModal(true);
                                          }}
                                        >
                                          <DropdownItem
                                            tag="a"
                                            href="#view"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            Edit
                                          </DropdownItem>
                                        </li>
                                        <li>
                                          <DropdownItem
                                            tag="a"
                                            href="#print"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            Remove
                                          </DropdownItem>
                                        </li>
                                      </ul>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </Block>
        )}
      </Content>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(Domain);
