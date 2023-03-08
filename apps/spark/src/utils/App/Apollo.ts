/**
 * The App utils include helper functions for routing, link building and the
 * apollo client
 * @packageDocumentation
 */
import { ApolloClient, ApolloLink, concat, FieldPolicy, HttpLink, InMemoryCache } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import possibleTypes from "@coremedia-labs/graphql-layer/dist/__downloaded__/possibleTypes.json";
import log from "loglevel";
import { formatPreviewDate, isPreview } from "../Preview/Preview";
import { getEndpoint } from "./App";

type KeyArgs = FieldPolicy<any>["keyArgs"];

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
          searchProducts: offsetLimitPaginationForItems(["categoryId", "filterFacets"]),
        },
      },
      ContentRoot: {
        fields: {
          search: offsetLimitPagination(["query", "siteId", "sortFields", "customFilterQueries", "docTypes"]),
          facetedSearch: offsetLimitPagination([
            "query",
            "siteId",
            "sortFields",
            "customFilterQueries",
            "facetLimit",
            "facetFilters",
          ]),
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
  log.info("New Apollo Client created", link);
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
 * @param apqEnabled set to true to use APQ via GET requests
 */
export const initializeApollo = (newPreviewDate: string | undefined, apqEnabled: boolean): ApolloClient<unknown> => {
  // Create the Apollo Client once in the client, if not changed or previewDate is set
  if (!apolloClient || newPreviewDate) {
    let link: ApolloLink = new HttpLink({
      uri: getEndpoint(),
    });
    if (newPreviewDate && isPreview()) {
      log.info("Time travel is activated.", newPreviewDate);
      const previewMiddleware = createPreviewMiddleWare(newPreviewDate);
      link = previewMiddleware ? concat(previewMiddleware, link) : link;
    }
    if (apqEnabled) {
      log.info("Automatic persistent queries are activated.");
      const persistedQueriesLink = createPersistedQueryLink({ sha256, useGETForHashedQueries: true });
      link = persistedQueriesLink.concat(link);
    }
    // Set global state
    apolloClient = createApolloClient(link);
  }
  return apolloClient;
};

/**
 * A basic field policy that uses options.args.{offset,limit} to splice
 * the incoming data into the existing array. If your arguments are called
 * something different (like args.{start,count}), feel free to copy/paste
 * this implementation and make the appropriate changes.
 *
 * @param keyArgs
 */
export const offsetLimitPagination = (keyArgs: KeyArgs = false): FieldPolicy => {
  return {
    keyArgs,
    merge(existing, incoming, { args }) {
      const merged = existing && existing.result ? existing.result.slice(0) : [];
      if (args) {
        const { offset = 0 } = args;
        for (let i = 0; i < incoming.result.length; ++i) {
          merged[offset + i] = incoming.result[i];
        }
      } else {
        // It's unusual (probably a mistake) for a paginated field not
        // to receive any arguments, so you might prefer to throw an
        // exception here, instead of recovering by appending incoming
        // onto the existing array.
        // eslint-disable-next-line prefer-spread
        merged.push.apply(merged, incoming.result);
      }

      return { ...incoming, result: merged };
    },
  };
};

export const offsetLimitPaginationForItems = (keyArgs: KeyArgs = false): FieldPolicy => {
  return {
    keyArgs,
    merge(existing, incoming, { args }) {
      const merged = existing && existing.items ? existing.items.slice(0) : [];
      if (args) {
        const { offset = 0 } = args;
        for (let i = 0; i < incoming.items.length; ++i) {
          merged[offset + i] = incoming.items[i];
        }
      } else {
        // It's unusual (probably a mistake) for a paginated field not
        // to receive any arguments, so you might prefer to throw an
        // exception here, instead of recovering by appending incoming
        // onto the existing array.
        // eslint-disable-next-line prefer-spread
        merged.push.apply(merged, incoming.items);
      }

      return { ...incoming, items: merged };
    },
  };
};
