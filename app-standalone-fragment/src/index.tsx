import React from "react";
import ReactDOM from "react-dom";
import StandaloneFragment from "./components/StandaloneFragment";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "./utils/Apollo";

export const render = (contentId: string, elementId: string, uri: string): void => {
  const fragmentElement = document.getElementById(elementId);

  if (fragmentElement !== null && uri) {
    const endpointUri = uri + "/api/graphql";
    const caasUri = uri + "/api";
    const apolloClient = initializeApollo(endpointUri);

    ReactDOM.render(
      <React.StrictMode>
        <ApolloProvider client={apolloClient}>
          <StandaloneFragment contentId={contentId} caasUri={caasUri} />
        </ApolloProvider>
      </React.StrictMode>,
      fragmentElement
    );
  } else {
    console.error("CoreMedia Headless Fragment cannot be rendered, because no element or no server uri is defined");
  }
};
