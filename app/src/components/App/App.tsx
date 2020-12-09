import React, { FC } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { SiteContextProvider } from "../../context/SiteContextProvider";
import AppRoutes from "./AppRoutes";
import { getRootSegment } from "../../utils/App/App";
import FragmentPreview from "../../container/PreviewPage";
import { initializeApollo } from "../../utils/App/Apollo";
import { getPreviewDate, isPreview } from "../../utils/Preview/Preview";

import "./App.scss";

/**
 * The main app component with the ApolloClient and [[SiteContextProvider]]
 * @category Components
 */
const App: FC = () => {
  const location = useLocation();
  const rootSegment = getRootSegment(location.pathname);
  const previewDate = getPreviewDate(location.pathname);
  const apolloClient = initializeApollo(rootSegment, previewDate);

  return (
    <ApolloProvider client={apolloClient}>
      <Switch>
        <Route exact path={"/"}>
          <Redirect to={"/calista"} />
        </Route>
        {isPreview() && <Route path={"/preview/:id/:previewDate?"} component={FragmentPreview} />}

        <SiteContextProvider rootSegment={rootSegment} currentNavigation={location.pathname}>
          <AppRoutes />
        </SiteContextProvider>
      </Switch>
    </ApolloProvider>
  );
};

export default App;
