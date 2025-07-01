import { Executor } from "@graphql-tools/utils";
import { GraphQLError, GraphQLErrorExtensions, print } from "graphql";
import { campaignServiceEndpoint, coreMediaHeadlessServerEndpoint } from "./endpoints";
import logger from "./logger";

interface CMGraphQLErrorExtensions extends GraphQLErrorExtensions {
  request?: RequestInit;
  response?: {
    status: number;
    type: string;
    headers?: Record<string, string>;
    body?: string;
  };
}

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
  logger.info(
    "Query '" +
      context.request?.body?.operationName +
      "' with variables " +
      JSON.stringify(variables) +
      " from " +
      coreMediaHeadlessServerEndpoint()
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

  // fetch request from coreMediaHeadlessServerEndpoint with custom error handling
  let response: Response;
  let jsonResult;
  try {
    logger.debug("Request: " + JSON.stringify(requestInit));
    response = await fetch(coreMediaHeadlessServerEndpoint(), requestInit);
    jsonResult = await response.clone().json();
  } catch (error) {
    const errorExtensions: CMGraphQLErrorExtensions = {
      code: "COREMEDIA_HLS_ERROR",
      http: {
        status: 502, //default is 200 even for errors
      },
      response: {
        status: response?.status,
        type: response?.type,
        body: await response?.text(),
      },
    };
    if (logger.level === "debug") {
      errorExtensions.request = requestInit;
      errorExtensions.response.headers = Object.fromEntries(response.headers.entries());
      logger.debug("Response: " + JSON.stringify(errorExtensions.response));
    }
    throw new GraphQLError(error.message, {
      extensions: errorExtensions,
    });
  }
  return jsonResult;
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
