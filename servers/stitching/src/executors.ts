import { Executor } from "@graphql-tools/utils";
import { print } from "graphql";
import { campaignServiceEndpoint, coreMediaHeadlessServerEndpoint } from "./endpoints";
import logger from "./logger";

/**
 * Executor to query subschema endpoint. Forwards headers from the context
 * For some reason when running graphiql, the headers hide within
 * "context.headers", for all other calls within "context.request.headers"
 *
 * @param document
 * @param variables
 * @param context
 */
export const cmExecutor: Executor = async ({ document, variables, context }) => {
  logger.info("Query " + context.request?.body?.operationName + " with variables " + JSON.stringify(variables));

  const query = print(document);
  let newHeaders = {};
  let method = "POST";
  if (context.request) {
    newHeaders = { ...context.request.headers };
    method = context.request.method;
  } else if (context.headers) {
    newHeaders = { ...context.headers };
    method = context.method;
  }
  // remove host and connection header to prevent issues with subschema service accepting it.
  delete newHeaders["host"];
  delete newHeaders["connection"];

  if (process.env.COREMEDIA_CLOUD_ACCESS_TOKEN) {
    newHeaders["CoreMedia-AccessToken"] = process.env.COREMEDIA_CLOUD_ACCESS_TOKEN;
  }

  // set correct content length for changed request.
  newHeaders["content-length"] = new TextEncoder().encode(JSON.stringify({ query, variables })).length;
  let requestInit = undefined;
  if (method !== "GET" && method !== "HEAD") {
    requestInit = {
      method: method,
      headers: {
        ...newHeaders,
      },
      body: JSON.stringify({ query, variables }),
    };
  }
  const fetchResult = await fetch(coreMediaHeadlessServerEndpoint(), requestInit);
  return fetchResult.json();
};

export const campaignExecutor: Executor = async ({ document, variables, context }) => {
  logger.info(
    "Campaign query " + context.request?.body?.operationName + " with variables " + JSON.stringify(variables)
  );

  const query = print(document);
  let newHeaders = {};
  let method = "POST";
  if (context.request) {
    newHeaders = { ...context.request.headers };
    method = context.request.method;
  } else if (context.headers) {
    newHeaders = { ...context.headers };
    method = context.method;
  }
  // remove host and connection header to prevent issues with subschema service accepting it.
  delete newHeaders["host"];
  delete newHeaders["connection"];

  // add campaign tenant information
  newHeaders["authorization"] = process.env.CAMPAIGN_AUTHORIZATION_ID;

  // set correct content length for changed request.
  newHeaders["content-length"] = new TextEncoder().encode(JSON.stringify({ query, variables })).length;
  logger.debug("new Headers: ", { message: newHeaders });
  let requestInit = undefined;
  if (method !== "GET" && method !== "HEAD") {
    requestInit = {
      method: method,
      headers: {
        ...newHeaders,
      },
      body: JSON.stringify({ query, variables }),
    };
  }
  const fetchResult = await fetch(campaignServiceEndpoint(), requestInit);
  return fetchResult.json();
};
