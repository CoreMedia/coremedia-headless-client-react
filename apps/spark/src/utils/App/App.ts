/**
 * Returns the GraphQL URL Endpoint
 * @category App
 */
export const getEndpoint = (): string => {
  let uri = process.env.REACT_APP_API_ENDPOINT || "";

  // use local stitching server as default in development
  if (!uri && process.env.NODE_ENV === "development") {
    uri = "http://localhost:4000/graphql";
  }

  // check for missing graphql
  if (!uri.endsWith("/graphql")) {
    uri = `${uri}/graphql`;
  }
  return uri;
};

/**
 * Returns REACT_APP_FQDN or empty string (for relative URLs).
 * Used for link building
 * @category App
 */
export const getFQDN = (): string => {
  return process.env.REACT_APP_FQDN || "";
};

/**
 * Returns the backend URI. Used for blob URLs like images
 * @category App
 */
export const getBackendUri = (): string => {
  let serverUrl = getFQDN();

  // fallback to endpoint or local stitching server in development
  if (!serverUrl && process.env.NODE_ENV === "development") {
    serverUrl = (process.env.REACT_APP_API_ENDPOINT || "http://localhost:4000").replace("/graphql", "");
  }
  return serverUrl;
};

/**
 * Returns the rootSegment of the app
 * @param path the URL path of "react-router-dom"
 * @category App
 */
export const getRootSegment = (path: string): string | undefined => {
  const navigationPath = path.split("/").filter((item) => {
    return item !== null && item !== "";
  });
  return navigationPath[0] !== "preview" ? navigationPath[0] : navigationPath[1];
};
