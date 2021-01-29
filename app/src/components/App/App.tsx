import React, { FC } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { SiteContextProvider } from "../../context/SiteContextProvider";
import AppRoutes from "./AppRoutes";
import { getRootSegment } from "../../utils/App/App";
import PreviewPage from "../../container/PreviewPage";
import { initializeApollo } from "../../utils/App/Apollo";
import { getPreviewDate, isPreview } from "../../utils/Preview/Preview";
import { PreviewContextProvider } from "../../context/PreviewContextProvider";

import "./App.scss";

/**
 * The main app component with the ApolloClient, [[SiteContextProvider]], and [[PreviewContextProvider]]
 * @category Components
 */
const App: FC = () => {
  const location = useLocation();
  const rootSegment = getRootSegment(location.pathname);
  const previewDate = getPreviewDate(useLocation().search);
  const apolloClient = initializeApollo(rootSegment, previewDate);

  return (
    <ApolloProvider client={apolloClient}>
      <PreviewContextProvider previewDate={previewDate}>
        <Switch>
          <Route exact path={"/"}>
            <Redirect to={"/calista"} />
          </Route>
          {isPreview() && <Route path={"/preview/:rootSegment/:id/"} component={PreviewPage} />}

          <SiteContextProvider rootSegment={rootSegment} currentNavigation={location.pathname}>
            <AppRoutes />
          </SiteContextProvider>
        </Switch>
      </PreviewContextProvider>
    </ApolloProvider>
  );
};

export default App;
