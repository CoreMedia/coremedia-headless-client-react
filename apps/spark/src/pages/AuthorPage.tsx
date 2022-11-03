import React, { FC } from "react";
import { match } from "react-router-dom";
import { useDetailQuery } from "@coremedia-labs/graphql-layer";
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
  const { rootSegment } = useSiteContextState();
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
  return (
    <>
      <StyledCol zone={"main"}>
        <SeoHeader title={content.title} />
        <DetailPerson {...detail} />
      </StyledCol>
    </>
  );
};

export default AuthorPage;
