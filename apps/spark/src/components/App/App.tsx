import React, { FC } from "react";
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

import "./App.scss";

/**
 * The main app component with the ApolloClient, [[SiteContextProvider]], and [[PreviewContextProvider]]
 * @category Components
 */
const App: FC = () => {
  const location = useLocation();
  const rootSegment = getRootSegment(location.pathname) || getGlobalState().rootSegment;
  const previewDate = getPreviewDate(useLocation().search);
  const apolloClient = initializeApollo(previewDate, isAPQEnabled());

  return (
    <ApolloProvider client={apolloClient}>
      <PreviewContextProvider previewDate={previewDate}>
        <HelmetProvider>
          <Switch>
            <Route exact path={"/"}>
              <Redirect to={`/${rootSegment}`} />
            </Route>
            {isPreview() && <Route path={"/preview/:rootSegment/:id/"} component={PreviewPage} />}

            <SiteContextProvider rootSegment={rootSegment} currentNavigation={location.pathname}>
              <AppRoutes />
            </SiteContextProvider>
          </Switch>
        </HelmetProvider>
      </PreviewContextProvider>
    </ApolloProvider>
  );
};

export default App;
