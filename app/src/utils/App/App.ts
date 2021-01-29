/**
 * Adds a suffix "api" if
 *  a) in production mode and
 *  b) endpoint is running on same host as the app
 * @internal
 * @category App
 * @param uri
 */
const withOptionalApiSuffix = (uri: string): string => {
  if (process.env.NODE_ENV === "production" && process.env.REACT_APP_API_ENDPOINT === process.env.REACT_APP_FQDN) {
    uri = `${uri}/api`;
  }
  return uri;
};

/**
 * Returns the GraphQL URL based on the rootSegment
 * @category App
 * @param rootSegment
 */
export const getEndpoint = (rootSegment?: string): string => {
  let uri = process.env.REACT_APP_API_ENDPOINT || "";
  uri = withOptionalApiSuffix(uri);
  if (rootSegment) {
    uri = `${uri}/${rootSegment}`;
  }
  return `${uri}/graphql`;
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
  // fallback to endpoint in development
  if (!serverUrl && process.env.NODE_ENV === "development") {
    serverUrl = process.env.REACT_APP_API_ENDPOINT || "";
  }
  return withOptionalApiSuffix(serverUrl);
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
