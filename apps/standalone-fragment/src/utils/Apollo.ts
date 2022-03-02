import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import possibleTypes from "@coremedia-labs/graphql-layer/dist/__downloaded__/possibleTypes.json";

let apolloClient: ApolloClient<unknown>;

const createInMemoryCache = (): InMemoryCache => {
  return new InMemoryCache({
    possibleTypes,
  });
};

const createApolloClient = (link: ApolloLink): ApolloClient<unknown> => {
  const cache = createInMemoryCache();
  return new ApolloClient({
    cache: cache,
    link: link,
  });
};

export const initializeApollo = (endpointUri: string): ApolloClient<unknown> => {
  if (!apolloClient) {
    const link: ApolloLink = new HttpLink({
      uri: endpointUri,
    });
    apolloClient = createApolloClient(link);
  }
  return apolloClient;
};
