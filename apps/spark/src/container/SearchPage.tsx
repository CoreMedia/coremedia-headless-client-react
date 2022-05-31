import React, { FC } from "react";
import {
  SortFieldWithOrder,
  FacetedSearchQuery,
  FacetedSearchQueryVariables,
  FACETED_SEARCH_QUERY,
  FacetFilter,
} from "@coremedia-labs/graphql-layer";
import { NetworkStatus, useQuery } from "@apollo/client";
import { useSearchStateContextState } from "../context/SearchStateContext";
import Loading from "../components/Loading/Loading";
import { Alert, ApolloClientAlert } from "../components/Error/Alert";
import SearchPageContext, { Facet } from "../context/SearchPageContext";
import SeoHeader from "../components/Header/SeoHeader";
import Search from "../components/Search/Search";
import { useSiteContextState } from "../context/SiteContextProvider";
import { notEmpty } from "../utils/Helpers";

const asSortFieldWithOrder = (sortFieldName: string | null): SortFieldWithOrder | null => {
  if (Object.values(SortFieldWithOrder).some((col: string) => col === sortFieldName)) {
    return sortFieldName as SortFieldWithOrder;
  }
  return null;
};

const SearchPage: FC = () => {
  const { siteId } = useSiteContextState();
  const { query } = useSearchStateContextState();

  const { sortField, limit, selectedFacets } = useSearchStateContextState();

  const currentFacets: Array<FacetFilter> = [];
  // if (types) {
  //   currentFacets.push({ facetAlias: "type", filterValues: types });
  // }
  selectedFacets.forEach((value) => {
    const index = currentFacets.findIndex((facet) => facet.facetAlias === value.facetCategory);
    if (index > 0) {
      const item = currentFacets[index];
      if (!item.filterValues) {
        item.filterValues = [value.facetLabel];
      } else if (item.filterValues.indexOf(value.facetLabel) < 0) {
        item.filterValues = [...item.filterValues, value.facetLabel];
      }
      currentFacets[index] = item;
    } else {
      currentFacets.push({
        facetAlias: value.facetCategory,
        filterValues: [value.facetLabel],
      });
    }
  });

  console.log(currentFacets);

  const sortFieldWithOrder = asSortFieldWithOrder(sortField);
  const { data, loading, error, fetchMore, networkStatus } = useQuery<FacetedSearchQuery, FacetedSearchQueryVariables>(
    FACETED_SEARCH_QUERY,
    {
      variables: {
        siteId: siteId,
        query: query || "",
        offset: 0,
        limit: limit,
        facetFilters: currentFacets,
        sortFields: sortFieldWithOrder == null ? null : [sortFieldWithOrder],
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (loading && !loadingMorePosts) {
    return <Loading />;
  }
  if (error) {
    return <ApolloClientAlert error={error} />;
  }
  if (!data || !data.content || !data.content.facetedSearch) {
    return <Alert title="404 - Search not found" message="Sorry, the requested search could not be performed." />;
  }

  const onLoadMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    fetchMore({
      variables: {
        offset:
          (data &&
            data.content &&
            data.content.facetedSearch &&
            data.content.facetedSearch.result &&
            data.content.facetedSearch.result.length) ||
          0,
      },
    });
  };

  const facets: Array<Facet> = data.content.facetedSearch.facets.map((entry) => ({
    key: entry.field,
    label: entry.alias,
    values:
      (entry.values &&
        entry.values
          .filter(notEmpty)
          .map((value) => ({ label: value.value, query: value.query, hitCount: value.hitCount }))) ||
      [],
  }));

  return (
    <SearchPageContext
      query={query}
      totalCount={data?.content?.facetedSearch?.numFound}
      availableFacets={facets}
      result={data?.content?.facetedSearch?.result}
      onLoadMore={onLoadMore}
      isLoading={loadingMorePosts}
    >
      <SeoHeader title={`Search "${query}"`} />
      <Search />
    </SearchPageContext>
  );
};

export default SearchPage;
