import React, { FC, useMemo } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { SiteContextProvider } from "../../context/SiteContextProvider";
import CartContextProvider from "../../context/CartContext";
import { getRootSegment, isAPQEnabled, setLogLevel } from "../../utils/App/App";
import PreviewPage from "../../pages/PreviewPage";
import { initializeApollo } from "../../utils/App/Apollo";
import { getPreviewCampaignId, getPreviewDate, isPreview } from "../../utils/Preview/Preview";
import { PreviewContextProvider } from "../../context/PreviewContextProvider";
import SearchStateContextProvider from "../../context/SearchStateContext";
import CommercePreviewPage from "../../pages/CommercePreviewPage";
import AppRoutes from "./AppRoutes";
import CmecTag from "./CmecTag";
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
  setLogLevel();

  const location = useLocation();
  const rootSegment = getRootSegment(location.pathname) || "calista";
  const previewDate = getPreviewDate(location.search);
  const previewCampaignId = getPreviewCampaignId(location.search);
  const urlSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const apolloClient = initializeApollo(previewDate, isAPQEnabled());

  return (
    <ApolloProvider client={apolloClient}>
      <PreviewContextProvider previewDate={previewDate} previewCampaignId={previewCampaignId}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <SiteContextProvider rootSegment={rootSegment} currentNavigation={location.pathname}>
            <ScrollToTop />
            <CartContextProvider>
              <SearchStateContextProvider
                sortField={urlSearchParams.get("sort")}
                query={urlSearchParams.get("query") || ""}
              >
                <HelmetProvider>
                  <Switch>
                    <Route exact path={"/"}>
                      <Redirect to={`/${rootSegment}`} />
                    </Route>
                    {isPreview() && <Route path={"/preview/:rootSegment/:id/"} component={PreviewPage} />}
                    {isPreview() && (
                      <Route
                        path={"/commercepreview/:rootSegment/:type/:externalId/"}
                        component={CommercePreviewPage}
                      />
                    )}

                    <PageContext>
                      <AppRoutes />
                    </PageContext>
                  </Switch>
                  <CmecTag />
                </HelmetProvider>
              </SearchStateContextProvider>
            </CartContextProvider>
          </SiteContextProvider>
        </ThemeProvider>
      </PreviewContextProvider>
    </ApolloProvider>
  );
};

export default App;
