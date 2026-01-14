import * as http from "node:http";
import logger from "./logger";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import { json } from "body-parser";
import { resolvers } from "./resolvers";
import { stitchSchemas } from "@graphql-tools/stitch";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageDisabled,
} from "@apollo/server/plugin/disabled";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import { wrapSchema } from "@graphql-tools/wrap";
import { createActuator } from "./actuator";
import { cmExecutor } from "./executors";
import { commerceCatalogEndpoint, coreMediaHeadlessServerEndpoint, proxyEndpoint } from "./endpoints";

const fetchSchemas = async () => {
  try {
    logger.info("Fetching schemas from GraphQL endpoints");

    if (process.env.COREMEDIA_CLOUD_ACCESS_TOKEN) {
      logger.debug("Connecting Cloud Instance via 'CoreMedia-AccessToken'");
    }

    logger.info(`Loading schema from ${coreMediaHeadlessServerEndpoint()} (Headless Server).`);
    const coreMediaSchema = await loadSchema(coreMediaHeadlessServerEndpoint(), {
      loaders: [new UrlLoader()],
      headers: {
        "CoreMedia-AccessToken": process.env.COREMEDIA_CLOUD_ACCESS_TOKEN || "",
      },
    });
    logger.info(`Successfully loaded schema from coreMediaHeadlessServerEndpoint.`);

    logger.info(`Loading schema from ${commerceCatalogEndpoint()} (Headless Commerce Server).`);
    const catalogSchema = await loadSchema(commerceCatalogEndpoint(), {
      loaders: [new UrlLoader()],
    });
    logger.info(`Successfully loaded schema from commerceCatalogEndpoint.`);

    // Schema extensions
    const linkSchemaDefs = `
        extend type CategoryRef {
            category: Category
        }
        extend type ProductRef {
            product: Product
        }
        extend interface Category {
            augmentation: CategoryAugmentation!
        }
        extend type CategoryImpl {
            augmentation: CategoryAugmentation!
        }
        extend interface Product {
            augmentation: ProductAugmentation!
        }
        extend type ProductImpl {
            augmentation: ProductAugmentation!
        }
        extend type ProductVariantImpl {
            augmentation: ProductAugmentation!
        }
  `;

    return stitchSchemas({
      subschemas: [wrapSchema({ schema: coreMediaSchema, executor: cmExecutor }), catalogSchema],
      resolvers: resolvers(wrapSchema({ schema: coreMediaSchema, executor: cmExecutor }), catalogSchema),
      typeDefs: linkSchemaDefs,
    });
  } catch (error) {
    logger.error("Could not retrieve and stitch schemas.");
    logger.error(error, { message: error.message });
    process.exit(1);
  }
};

export const createServer = async () => {
  // create express server with cors
  const app = express().disable("x-powered-by").use(cors());

  // add actuator endpoint
  if (process.env.NODE_ENV === "production") {
    app.use(createActuator());
  }

  // add poxy endpoint for images and blobs
  app.use(
    "/caas",
    proxy(proxyEndpoint(), {
      limit: "25mb",
      proxyReqPathResolver: (req) => {
        return "/caas" + req.url;
      },
      proxyReqOptDecorator: (requestOptions) => {
        if (process.env.COREMEDIA_CLOUD_ACCESS_TOKEN) {
          requestOptions.headers["CoreMedia-AccessToken"] = process.env.COREMEDIA_CLOUD_ACCESS_TOKEN;
        }
        return requestOptions;
      },
    })
  );

  // add apollo server
  const httpServer = http.createServer(app);
  const schema = await fetchSchemas();
  const server = new ApolloServer({
    schema: schema,
    introspection: true,
    plugins: [
      process.env.NODE_ENV !== "production" || process.env.COREMEDIA_STITCHING_ENABLE_APOLLO_STUDIO === "true"
        ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
        : ApolloServerPluginLandingPageDisabled(),
      ApolloServerPluginInlineTraceDisabled(), // disabled, Apollo Federation not used.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        // log errors
        async requestDidStart() {
          return {
            async didEncounterErrors({ errors }) {
              errors.map((error) => {
                logger.error(`Response Error "${error.message}" in path "${error.path}"`);
                logger.debug(error.stack);
              });
            },
          };
        },
      },
    ],
  });
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ request: req }),
    })
  );

  return httpServer;
};
