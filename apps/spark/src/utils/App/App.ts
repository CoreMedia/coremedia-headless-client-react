import { version } from "../../__generated__/version.json";

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

/**
 * Returns true if REACT_APP_APQ_ENABLED is set to "true"
 * @category App
 */
export const isAPQEnabled = () => {
  return process.env.REACT_APP_APQ_ENABLED === "true";
};

export const getWorkspaceVersion = () => {
  return version;
};
