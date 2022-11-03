import React, { FC, useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { SortFieldWithOrder } from "@coremedia-labs/graphql-layer";
import { ThemeProvider } from "styled-components";
import { SiteContextProvider } from "../../context/SiteContextProvider";
import { getRootSegment, isAPQEnabled } from "../../utils/App/App";
import PreviewPage from "../../pages/PreviewPage";
import { initializeApollo } from "../../utils/App/Apollo";
import { getPreviewDate, isPreview } from "../../utils/Preview/Preview";
import { PreviewContextProvider } from "../../context/PreviewContextProvider";
import SearchStateContextProvider, { SearchSortField } from "../../context/SearchStateContext";
import CommercePreviewPage from "../../pages/CommercePreviewPage";
import AppRoutes from "./AppRoutes";
import PageContext from "./PageContext";
import ScrollToTop from "./ScrollToTop";
import { GlobalStyle } from "./GlobalStyle";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

/**
 * The main app component with the ApolloClient, [[SiteContextProvider]], and [[PreviewContextProvider]]
 * @category Components
 */
const App: FC = () => {
  const location = useLocation();
  const rootSegment = getRootSegment(location.pathname) || "calista";
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
      value: SortFieldWithOrder.ExternallyDisplayedDateAsc,
    },
    {
      label: "Display Date Desc",
      value: SortFieldWithOrder.ExternallyDisplayedDateDesc,
    },
    { label: "Creation Date Asc", value: SortFieldWithOrder.CreationDateAsc },
    {
      label: "Creation Date Desc",
      value: SortFieldWithOrder.CreationDateDesc,
    },
    {
      label: "Modification Date Asc",
      value: SortFieldWithOrder.ModificationDateAsc,
    },
    {
      label: "Modification Date Desc",
      value: SortFieldWithOrder.ModificationDateDesc,
    },
  ];

  return (
    <ApolloProvider client={apolloClient}>
      <PreviewContextProvider previewDate={previewDate}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <SiteContextProvider rootSegment={rootSegment} currentNavigation={location.pathname}>
            <ScrollToTop />
            <SearchStateContextProvider
              sortField={urlSearchParams.get("sort")}
              sortFields={sortFields}
              query={urlSearchParams.get("query") || ""}
            >
              <HelmetProvider>
                <Switch>
                  <Route exact path={"/"}>
                    <Redirect to={`/${rootSegment}`} />
                  </Route>
                  {isPreview() && <Route path={"/preview/:rootSegment/:id/"} component={PreviewPage} />}
                  {isPreview() && (
                    <Route path={"/commercepreview/:rootSegment/:type/:externalId/"} component={CommercePreviewPage} />
                  )}

                  <PageContext>
                    <AppRoutes />
                  </PageContext>
                </Switch>
              </HelmetProvider>
            </SearchStateContextProvider>
          </SiteContextProvider>
        </ThemeProvider>
      </PreviewContextProvider>
    </ApolloProvider>
  );
};

export default App;
