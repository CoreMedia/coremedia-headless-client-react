import React, { FC } from "react";
import { match } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import Slot from "../components/Slot/Slot";
import { getGlobalState } from "../utils/App/GlobalState";
import { SearchQuery } from "@coremedia-labs/graphql-layer";

interface DetailViewProps {
  match: match<RouteProps>;
}

interface RouteProps {
  id: string;
  title: string;
}

const TopicPage: FC<DetailViewProps> = ({ match }) => {
  const { siteId } = getGlobalState();

  const { data, loading, error, fetchMore } = SearchQuery(
    siteId,
    "*",
    null,
    6,
    null,
    [{ SUBJ_TAXONOMY_OR: [match.params.id] }],
    ["CMArticle", "CMProductTeaser"]
  );

  if (loading) {
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
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.content ||
          !prev.content ||
          !prev.content.search ||
          !prev.content.search.result ||
          !fetchMoreResult.content.search ||
          !fetchMoreResult.content.search.result
        ) {
          return prev;
        }

        return Object.assign({}, fetchMoreResult, {
          content: {
            ...fetchMoreResult.content,
            search: {
              ...fetchMoreResult.content.search,
              result: [...prev.content.search.result, ...fetchMoreResult.content.search.result],
            },
          },
        });
      },
    });
  };

  return (
    <div id="cm-placement-main" className="cm-placement cm-placement--main">
      <div className="cm-details-container">
        <Slot
          title={`${data.content.search.numFound} result${data.content.search.numFound > 1 ? "s" : ""} found for tag ${
            match.params.title
          }`}
          className={"cm-landscape-banner"}
          viewName={"asLandscapeBanner"}
          items={data.content.search.result}
        />
      </div>
      {data.content.search.result && data.content.search.result.length < data?.content?.search?.numFound && (
        <button className="cm-search__more" onClick={onLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default TopicPage;
