import React, { FC } from "react";
import { match } from "react-router-dom";
import { useDetailQuery } from "@coremedia-labs/graphql-layer";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { StyledCol } from "../components/PageGrid/Col";
import SeoHeader from "../components/Header/SeoHeader";
import { useSiteContextState } from "../context/SiteContextProvider";
import { initializeDetailAuthor } from "../models/Detail/DetailAuthor";
import DetailPerson from "../components/Details/DetailPerson";

interface DetailViewProps {
  match: match<RouteProps>;
}

interface RouteProps {
  id: string;
}

const AuthorPage: FC<DetailViewProps> = ({ match }) => {
  const { rootSegment, cmecConfig } = useSiteContextState();
  const { data, loading, error } = useDetailQuery({
    variables: {
      id: match.params.id,
    },
  });

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content) return <PageNotFoundAlert />;

  const content: any = data.content.content;
  const detail = initializeDetailAuthor(content, rootSegment);

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
        <DetailPerson {...detail} />
      </StyledCol>
    </>
  );
};

export default AuthorPage;
