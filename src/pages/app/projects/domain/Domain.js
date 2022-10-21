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
  BlockTitle
} from "../../../../components/block/Block";

import { Card, Spinner } from "reactstrap";
import { getProjectDomains } from "../../../../services/projects";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

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
        ) : (
          error? (<>Error..</>) :(
            <Block>
              <Card className="card-bordered card-stretch">
                <div className="card-inner-group">
                  <div className="card-inner p-0">
                    <table className="table table-tranx">
                      <thead>
                        <tr className="tb-tnx-head">
                          <th className="tb-tnx-id">
                            <span className="">id</span>
                          </th>
                          <th className="tb-tnx-info">
                            <span className="tb-tnx-desc d-none d-sm-inline-block">
                              <span>Name</span>
                            </span>
                            <span className="tb-tnx-desc d-none d-sm-inline-block">
                              <span>SSL</span>
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data && data.count > 0
                          ? data.results.map((item) => {
                              return (
                                <tr key={item.id} className="tb-tnx-item">
                                  <td className="tb-tnx-id">
                                    <span>{item.id}</span>
                                  </td>
                                  <td className="tb-tnx-info">
                                    <div className="tb-tnx-desc">
                                      <span className="title">{item.name}</span>
                                    </div>
                                    <div className="tb-tnx-desc">
                                      <span className="title">{!!item.ssl ? "true" : "false"}</span>
                                    </div>
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
          )
        )}
      </Content>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(Domain);
