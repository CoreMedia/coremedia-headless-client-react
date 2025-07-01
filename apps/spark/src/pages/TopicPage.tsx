import React, { FC } from "react";
import { match } from "react-router-dom";
import { useSearchQuery } from "@coremedia-labs/graphql-layer";
import { NetworkStatus } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { StyledCol } from "../components/PageGrid/Col";
import { MoreButton } from "../components/Search/SearchResult";
import LandscapeBannerContainer from "../components/LandscapeBanner/LandscapeBannerContainer";
import { useSiteContextState } from "../context/SiteContextProvider";
import { notEmpty } from "../utils/Helpers";
import { initializeBannerFor } from "../models/Banner/Banner";

interface DetailViewProps {
  match: match<RouteProps>;
}

interface RouteProps {
  id: string;
  title: string;
}

const TopicPage: FC<DetailViewProps> = ({ match }) => {
  const { siteId, cmecConfig } = useSiteContextState();
  const { rootSegment } = useSiteContextState();

  const { data, loading, error, fetchMore, networkStatus } = useSearchQuery({
    variables: {
      siteId: siteId,
      query: "*",
      limit: 6,
      customFilterQueries: [{ SUBJ_TAXONOMY_OR: [match.params.id] }],
      docTypes: ["CMArticle", "CMProductTeaser"],
    },
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (loading && !loadingMorePosts) {
    return <Loading />;
  }
  if (error) {
    return <ApolloClientAlert error={error} />;
  }
  if (!data || !data.content || !data.content.search) {
    return <PageNotFoundAlert />;
  }

  const onLoadMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    fetchMore({
      variables: {
        offset:
          (data &&
            data.content &&
            data.content.search &&
            data.content.search.result &&
            data.content.search.result.length) ||
          0,
      },
    });
  };

  // cmec extra metrics
  const cmecPageData = `var bysideWebcare_content_unavailable = new Date().getTime();`;

  return (
    <StyledCol zone={"main"}>
      {!!cmecConfig && (
        <Helmet>
          <script>{cmecPageData}</script>
        </Helmet>
      )}
      <LandscapeBannerContainer
        title={`${data.content.search.numFound} result${data.content.search.numFound > 1 ? "s" : ""} found for tag ${
          match.params.title
        }`}
        items={
          data?.content?.search?.result
            ?.filter(notEmpty)
            .map((item: any) => initializeBannerFor(item, rootSegment))
            .filter(notEmpty) || []
        }
      />
      {data.content.search.result && data.content.search.result.length < data?.content?.search?.numFound && (
        <MoreButton onClick={onLoadMore} disabled={loadingMorePosts}>
          {loadingMorePosts ? "Loading..." : "Show More"}
        </MoreButton>
      )}
    </StyledCol>
  );
};

export default TopicPage;
