import React, { FC } from "react";
import { match } from "react-router-dom";
import { PageGrid as PageGridGraphQl, usePageByPathQuery } from "@coremedia-labs/graphql-layer";
import PageGrid from "../components/PageGrid/PageGrid";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { initializeGrid } from "../models/Grid/Grid";
import SeoHeader from "../components/Header/SeoHeader";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";
import {PreviewP13NExperiences, usePreviewContextState} from "../context/PreviewContextProvider";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  pageId: string;
  pathSegments: string;
}

const Page: FC<PageProps> = ({ match }) => {
  const path = match.params.pathSegments;
  const { data, loading, error } = usePageByPathQuery({
    variables: {
      path: path,
    },
  });

  // catch the function to set the preview experience
  const { setExp2 } = usePreviewContextState();

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.pageByPath) return <PageNotFoundAlert />;

  // the p13 hook which is used by studio "eye".
  window.addEventListener("message", function (event) {
    const data = event.data;
    if (data.type === "cm_p13n") {
      const variantId = data?.body?.variantId;
      const exp:PreviewP13NExperiences = {variants: [variantId]};
      setExp2 && setExp2(exp);
    }
  }, false);

  return (
    <>
      <SeoHeader title={data?.content?.pageByPath?.title} />
      {data?.content?.pageByPath?.id && <RootPreviewId metadataRoot={{ id: data?.content?.pageByPath?.id }} />}
      {data.content.pageByPath.grid && (
        <PageGrid {...initializeGrid(data.content.pageByPath.grid as PageGridGraphQl)} />
      )}
    </>
  );
};

export default Page;
