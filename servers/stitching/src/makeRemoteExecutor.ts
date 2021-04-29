import { fetch } from "cross-fetch";
import { print } from "graphql";
import logger from "./logger";

/**
 * Builds a remote schema executor function,
 * customize any way that you need (auth, headers, etc).
 * Expects to receive an object with "document" and "variable" params,
 * and asynchronously returns a JSON response from the remote.
 *
 * @param url
 * @param headers
 */
const makeRemoteExecutor = (url: string, headers?: HeadersInit) => {
  // enable SSL for self-signed certs
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  let logMessage = `Connecting endpoint ${url}`;
  if (headers) {
    logMessage = logMessage + " with headers: " + JSON.stringify(headers);
  }
  logger.info(logMessage);

  return async ({ document, variables, context }) => {
    const query = typeof document === "string" ? document : print(document);
    const headers = context ? context.headers : { "Content-Type": "application/json" };
    //delete host header from origin request to avoid CORS server errors
    delete headers.host;
    //if not defined yet, always add default content type
    if (headers["Content-Type"] === undefined) {
      headers["Content-Type"] = "application/json";
    }
    try {
      const fetchResult = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ query, variables }),
      });

      if (fetchResult.status >= 400) {
        logger.error(`Bad response from server ${url}, Status: ${fetchResult.status}`);
        return;
      }

      logger.verbose("Fetched data from " + url);
      logger.debug(JSON.stringify({ query, variables }));
      return fetchResult.json();
    } catch (error) {
      logger.error(error);
      logger.debug(error.message);
      return;
    }
  };
};

export default makeRemoteExecutor;
