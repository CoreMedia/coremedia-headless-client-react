/**
 * The App utils include helper functions for routing, link building and the
 * apollo client
 * @packageDocumentation
 */
import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from "@apollo/client";
import possibleTypes from "../../__downloaded__/possibleTypes.json";
import { getEndpoint } from "./App";
import { formatPreviewDate, isPreview } from "../Preview/Preview";

/**
 * Global singleton instance of the ApolloClient.
 * @category Apollo
 */
let apolloClient: ApolloClient<unknown>;

/**
 * @category Apollo
 * @internal
 */
const createInMemoryCache = (): InMemoryCache => {
  return new InMemoryCache({
    possibleTypes,
    typePolicies: {
      PageGridPlacement: { keyFields: ["id", "name"] },
      PageGridRow: { keyFields: ["id", "rowId"] },
      Query: {
        fields: {
          content: {
            merge: true,
          },
          commerce: {
            merge: true,
          },
        },
      },
    },
  });
};

/**
 * Creates a new ApolloClient with the given ApolloLink.
 * @category Apollo
 * @internal
 * @param link includes the URI of the GraphQl Endpoint
 */
const createApolloClient = (link: ApolloLink): ApolloClient<unknown> => {
  console.log("New Apollo Client created", link);
  const cache = createInMemoryCache();
  return new ApolloClient({
    cache: cache,
    link: link,
  });
};

/**
 * Adds X-Preview-Date header with a given previewDate to the apolloClient.
 * @category Apollo
 * @internal
 */
const createPreviewMiddleWare = (previewDate: string): ApolloLink => {
  return new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        "X-Preview-Date": formatPreviewDate(previewDate),
      },
    });
    return forward(operation);
  });
};

/**
 * Returns the singleton instance of the ApolloClient.
 * If no client exist, or previewDate is set,
 * a new instance of the client is created.
 * @category Apollo
 * @param newPreviewDate optional preview date used for Time Travel in CoreMedia Studio Preview
 */
export const initializeApollo = (newPreviewDate: string | undefined): ApolloClient<unknown> => {
  // Create the Apollo Client once in the client, if not changed or previewDate is set
  if (!apolloClient || newPreviewDate) {
    newPreviewDate && console.log("Time travel is activated.", newPreviewDate);
    let link: ApolloLink = new HttpLink({
      uri: getEndpoint(),
    });
    if (newPreviewDate && isPreview()) {
      const previewMiddleware = createPreviewMiddleWare(newPreviewDate);
      link = previewMiddleware ? concat(previewMiddleware, link) : link;
    }
    // Set global state
    apolloClient = createApolloClient(link);
  }
  return apolloClient;
};
