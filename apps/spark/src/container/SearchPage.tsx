import React, { FC } from "react";
import { useSearchStateContextState } from "../context/SearchStateContext";
import { SortFieldWithOrder } from "@coremedia-labs/graphql-layer";
import { getGlobalState } from "../utils/App/GlobalState";
import Loading from "../components/Loading/Loading";
import { Alert, ApolloClientAlert } from "../components/Error/Alert";
import SearchPageContext, { Facet } from "../context/SearchPageContext";
import SeoHeader from "../components/Header/SeoHeader";
import Search from "../components/Search/Search";
import { SearchQuery } from "@coremedia-labs/graphql-layer";

const asSortFieldWithOrder = (sortFieldName: string | null): SortFieldWithOrder | null => {
  if (Object.values(SortFieldWithOrder).some((col: string) => col === sortFieldName)) {
    return sortFieldName as SortFieldWithOrder;
  }
  return null;
};

const SearchPage: FC = () => {
  const { siteId } = getGlobalState();
  const { query } = useSearchStateContextState();

  const { sortField, limit, types } = useSearchStateContextState();

  const sortFieldWithOrder = asSortFieldWithOrder(sortField);
  const { data, loading, error, fetchMore } = SearchQuery(
    siteId,
    query || "",
    0,
    limit,
    sortFieldWithOrder == null ? null : [sortFieldWithOrder],
    null,
    types
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ApolloClientAlert error={error} />;
  }
  if (!data || !data.content || !data.content.search) {
    return <Alert title="404 - Search not found" message="Sorry, the requested search could not be performed." />;
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

  const facets: Array<Facet> = [
    /*{
      label: "Category",
      key: "category",
      values: [
        { label: "For Consumers", query: "for_consumer", hitCount: 3 },
        { label: "For Professionals", query: "for_consumer", hitCount: 5 },
        { label: "Company", query: "for_consumer", hitCount: 9 },
      ],
    },
    {
      label: "Types",
      key: "types",
      multiSelect: true,
      values: [
        { label: "Article", query: "article" },
        { label: "Pages", query: "page" },
        { label: "Product", query: "product" },
      ],
    },
    {
      label: "Types2",
      key: "types2",
      multiSelect: false,
      values: [
        { label: "Article", query: "article" },
        { label: "Pages", query: "page" },
        { label: "Product", query: "product" },
      ],
    },*/
  ];

  return (
    <SearchPageContext
      query={query}
      totalCount={data?.content?.search?.numFound}
      availableFacets={facets}
      result={data?.content?.search?.result}
      onLoadMore={onLoadMore}
    >
      <SeoHeader title={`Search "${query}"`} />
      <Search />
    </SearchPageContext>
  );
};

export default SearchPage;
