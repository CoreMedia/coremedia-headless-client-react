import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import { Alert, ApolloClientAlert } from "../components/Error/Alert";
import SearchQuery from "../queries/SearchQuery";
import { SortFieldWithOrder } from "../__generated__/globalTypes";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import Search from "../components/Search/Search";

const SearchPage: FC = () => {
  const history = useHistory();

  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);

  const [query, setQuery] = useState<string>(urlSearchParams.get("query") || "");
  const [searchQuery, setSearchQuery] = useState<string>(query);

  const [doctypes] = useState(["CMArticle"]);

  const [limit] = useState(5);

  const [offset] = useState(0);

  const getSort = () => {
    const sortParam = urlSearchParams.get("sort") || "";
    if (Object.values(SortFieldWithOrder).some((col: string) => col === sortParam)) {
      return sortParam as SortFieldWithOrder;
    }
    return null;
  };

  const [sortField, setSortField] = useState<SortFieldWithOrder | null>(getSort);

  const sortFields = [
    {
      label: "Relevance",
      value: "",
    },
    {
      label: "Display Date Asc",
      value: SortFieldWithOrder.EXTERNALLY_DISPLAYED_DATE_ASC,
    },
    {
      label: "Display Date Desc",
      value: SortFieldWithOrder.EXTERNALLY_DISPLAYED_DATE_DESC,
    },
    { label: "Creation Date Asc", value: SortFieldWithOrder.CREATION_DATE_ASC },
    {
      label: "Creation Date Desc",
      value: SortFieldWithOrder.CREATION_DATE_DESC,
    },
    {
      label: "Modification Date Asc",
      value: SortFieldWithOrder.MODIFICATION_DATE_ASC,
    },
    {
      label: "Modification Date Desc",
      value: SortFieldWithOrder.MODIFICATION_DATE_DESC,
    },
  ];

  const onSortChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const localSortFieldWithOrder: SortFieldWithOrder | null = (e.currentTarget.value as SortFieldWithOrder) || null;
    setSortField(localSortFieldWithOrder);
    if (localSortFieldWithOrder == null) {
      urlSearchParams.delete("sort");
    } else {
      urlSearchParams.set("sort", localSortFieldWithOrder.toString());
    }
    location.search = urlSearchParams.toString();
    history.push(location);
  };

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    urlSearchParams.set("query", value.toString());
    location.search = urlSearchParams.toString();
    history.push(location);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchQuery(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const { data, loading, error, fetchMore } = SearchQuery(
    searchQuery,
    offset,
    limit,
    sortField == null ? null : [sortField],
    doctypes
  );

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
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

  return (
    <Search
      numFound={data?.content?.search?.numFound}
      result={data?.content?.search?.result}
      query={query}
      onQueryChange={onQueryChange}
      onSortChange={onSortChange}
      onLoadMore={onLoadMore}
      sortFields={sortFields}
      sortField={sortField}
    />
  );
};

export default SearchPage;
