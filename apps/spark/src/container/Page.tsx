import React, { FC } from "react";
import { match } from "react-router-dom";
import { PageByPathQuery } from "@coremedia-labs/graphql-layer";
import PageGrid from "../components/PageGrid/PageGrid";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { initializeGrid } from "../models/Grid/Grid";
import SeoHeader from "../components/Header/SeoHeader";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";

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

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.pageByPath) return <PageNotFoundAlert />;

  return (
    <>
      <SeoHeader title={data?.content?.pageByPath?.title} />
      {data?.content?.pageByPath?.id && <RootPreviewId metadataRoot={{ id: data?.content?.pageByPath?.id }} />}
      {data.content.pageByPath.grid && <PageGrid {...initializeGrid(data.content.pageByPath.grid)} />}
    </>
  );
};

export default Page;
