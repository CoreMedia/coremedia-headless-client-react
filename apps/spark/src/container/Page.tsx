import React, { FC, useEffect } from "react";
import { match } from "react-router";
import PageByPathQuery from "../queries/PageByPathQuery";
import PageGrid from "../components/PageGrid/PageGrid";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { initializeGrid } from "../models/Grid/Grid";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  pageId: string;
  pathSegments: string;
}

const Page: FC<PageProps> = ({ match }) => {
  const path = match.params.pathSegments;
  const { data, loading, error } = PageByPathQuery(path);

  // set page title
  const title = data?.content?.pageByPath?.title || "";
  useEffect(() => {
    document.title = title ? `${title} | CoreMedia Spark` : "CoreMedia Spark";
  }, [title]);

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.pageByPath) return <PageNotFoundAlert />;

  return <>{data.content.pageByPath.grid && <PageGrid {...initializeGrid(data.content.pageByPath.grid)} />}</>;
};

export default Page;
