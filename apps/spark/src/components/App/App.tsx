import React, { FC, useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { SiteContextProvider } from "../../context/SiteContextProvider";
import AppRoutes from "./AppRoutes";
import { getRootSegment, isAPQEnabled } from "../../utils/App/App";
import PreviewPage from "../../container/PreviewPage";
import { initializeApollo } from "../../utils/App/Apollo";
import { getPreviewDate, isPreview } from "../../utils/Preview/Preview";
import { PreviewContextProvider } from "../../context/PreviewContextProvider";
import { getGlobalState } from "../../utils/App/GlobalState";
import { HelmetProvider } from "react-helmet-async";
import SearchStateContextProvider, { SearchSortField } from "../../context/SearchStateContext";
import { SortFieldWithOrder } from "../../__generated__/globalTypes";

import "./App.scss";

/**
 * The main app component with the ApolloClient, [[SiteContextProvider]], and [[PreviewContextProvider]]
 * @category Components
 */
const App: FC = () => {
  const location = useLocation();
  const rootSegment = getRootSegment(location.pathname) || getGlobalState().rootSegment;
  const previewDate = getPreviewDate(location.search);
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const apolloClient = initializeApollo(previewDate, isAPQEnabled());

  const sortFields: Array<SearchSortField> = [
    {
      label: "Relevance",
      value: null,
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

  return (
    <ApolloProvider client={apolloClient}>
      <PreviewContextProvider previewDate={previewDate}>
        <HelmetProvider>
          <Switch>
            <Route exact path={"/"}>
              <Redirect to={`/${rootSegment}`} />
            </Route>
            {isPreview() && <Route path={"/preview/:rootSegment/:id/"} component={PreviewPage} />}

            <SearchStateContextProvider
              sortField={urlSearchParams.get("sort")}
              sortFields={sortFields}
              query={urlSearchParams.get("query") || ""}
            >
              <SiteContextProvider rootSegment={rootSegment} currentNavigation={location.pathname}>
                <AppRoutes />
              </SiteContextProvider>
            </SearchStateContextProvider>
          </Switch>
        </HelmetProvider>
      </PreviewContextProvider>
    </ApolloProvider>
  );
};

export default App;
