import React, { FC, useEffect } from "react";
import { match } from "react-router-dom";
import { useDetailQuery } from "@coremedia-labs/graphql-layer";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { StyledCol } from "../components/PageGrid/Col";
import { initializeDetail } from "../models/Detail/Detail";
import SeoHeader from "../components/Header/SeoHeader";
import Detail from "../components/Details/Detail";
import { useSiteContextState } from "../context/SiteContextProvider";
import { NavigationPathItem } from "../models/Navigation/NavigationPath";
import { useBreadcrumbContext } from "../context/BreadcrumbContext";
import ScrollTopLink from "../components/ScrollTop/ScrollTopLink";

interface DetailViewProps {
  match: match<RouteProps>;
}

interface RouteProps {
  id: string;
}

const DetailPage: FC<DetailViewProps> = ({ match }) => {
  const { rootSegment, cmecConfig } = useSiteContextState();
  const { setNavigationPath } = useBreadcrumbContext();

  const { data, loading, error } = useDetailQuery({
    variables: {
      id: match.params.id,
    },
  });

  useEffect(() => {
    // Update breadcrumb navigation path
    data && setNavigationPath(data.content?.content?.navigationPath as Array<NavigationPathItem>);
    return () => {
      setNavigationPath([]);
    };
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content) return <PageNotFoundAlert />;

  const content: any = data.content.content;
  const detail = initializeDetail(content, rootSegment);

  // cmec extra metrics
  let cmecPageData = `var bysideWebcare_content_uuid="${content.uuid}";`;
  cmecPageData += `var bysideWebcare_content_type="${content.type}";`;
  cmecPageData += `var bysideWebcare_content_locale="${content.locale}";`;

  return (
    <>
      {!!cmecConfig && (
        <Helmet>
          <script>{cmecPageData}</script>
        </Helmet>
      )}
      <StyledCol zone={"main"}>
        <SeoHeader title={content.title} />
        <Detail {...detail} />
        <ScrollTopLink />
      </StyledCol>
    </>
  );
};

export default DetailPage;
