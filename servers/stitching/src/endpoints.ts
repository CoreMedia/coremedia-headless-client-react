export const coreMediaHeadlessServerEndpoint = () => {
  let coreMediaEndpoint = process.env.COREMEDIA_ENDPOINT || "";

  // use local headless server as fallback in development
  if (!coreMediaEndpoint && process.env.NODE_ENV !== "production") {
    coreMediaEndpoint = "http://localhost:41180/graphql";
  }

  return checkGraphqlEndpointURL(coreMediaEndpoint);
};

export const commerceCatalogEndpoint = () => {
  let catalogEndpoint = process.env.CATALOG_ENDPOINT || "";

  // use local headless server as default in development
  if (!catalogEndpoint && process.env.NODE_ENV !== "production") {
    catalogEndpoint = "http://localhost:5000/graphql";
  }

  return checkGraphqlEndpointURL(catalogEndpoint);
};

export const proxyEndpoint = () => {
  return coreMediaHeadlessServerEndpoint().replace("/graphql", "");
};

export const campaignServiceEndpoint = () => {
  return process.env.CAMPAIGN_ENDPOINT || undefined;
};

/**
 *  checks and adds "/graphql" to URI, if missing
 * @param endpoint
 */
const checkGraphqlEndpointURL = (endpoint) => {
  if (endpoint && !endpoint.endsWith("/graphql")) {
    if (!endpoint.endsWith("/")) {
      endpoint = `${endpoint}/`;
    }
    endpoint = `${endpoint}graphql`;
  }
  return endpoint;
};
