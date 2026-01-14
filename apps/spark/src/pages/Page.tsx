import React, { FC, useEffect } from "react";
import { match } from "react-router-dom";
import { PageGrid as PageGridGraphQl, usePageByPathQuery } from "@coremedia-labs/graphql-layer";
import { Helmet } from "react-helmet-async";
import PageGrid from "../components/PageGrid/PageGrid";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { initializeGrid } from "../models/Grid/Grid";
import SeoHeader from "../components/Header/SeoHeader";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";
import { useSiteContextState } from "../context/SiteContextProvider";
import { NavigationPathItem } from "../models/Navigation/NavigationPath";
import { useBreadcrumbContext } from "../context/BreadcrumbContext";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  pageId: string;
  pathSegments: string;
}

const Page: FC<PageProps> = ({ match }) => {
  const { siteId, cmecConfig } = useSiteContextState();

  const { setNavigationPath } = useBreadcrumbContext();
  const path = match.params.pathSegments;

  const variables: any = {
    path: path,
    siteId: siteId,
  };

  const { data, loading, error } = usePageByPathQuery({ variables: variables });

  useEffect(() => {
    // Update breadcrumb navigation path
    data && setNavigationPath(data.content?.pageByPath?.navigationPath as Array<NavigationPathItem>);
    return () => {
      setNavigationPath([]);
    };
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.pageByPath) return <PageNotFoundAlert />;

  let cmecPageData = `var bysideWebcare_content_uuid="${data.content.pageByPath.uuid}";`;
  cmecPageData += `var bysideWebcare_content_type="${data.content.pageByPath.type}";`;
  cmecPageData += `var bysideWebcare_content_locale="${data.content.pageByPath.locale}";`;

  return (
    <>
      {!!cmecConfig && (
        <Helmet>
          <script>{cmecPageData}</script>
        </Helmet>
      )}
      <SeoHeader title={data?.content?.pageByPath?.title} />
      {data?.content?.pageByPath?.id && <RootPreviewId metadataRoot={{ id: data?.content?.pageByPath?.id }} />}
      {data.content.pageByPath.grid && (
        <PageGrid {...initializeGrid(data.content.pageByPath.grid as PageGridGraphQl)} />
      )}
    </>
  );
};

export default Page;
