import logger from "./logger";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import { resolvers } from "./resolvers";
import { stitchSchemas } from "@graphql-tools/stitch";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { loadSchema } from "@graphql-tools/load";
import { UrlLoader } from "@graphql-tools/url-loader";
import * as http from "http";
import { Server } from "http";
import { createActuator } from "./actuator";
import { print } from "graphql";
import { wrapSchema } from "@graphql-tools/wrap";
import { Executor } from "@graphql-tools/utils";
import fetch from "cross-undici-fetch";
import { graphqlHTTP } from "express-graphql";
import { defaultQueryString } from "./graphiqlDefaultQuery";

const makeGatewaySchema = async () => {
  config();

  try {
    logger.info("Fetching schemas from both GraphQL endpoints");

    logger.info(`Loading schema from ${coreMediaHeadlessServerEndpoint()} (Headless Server).`);
    const coreMediaSchema = await loadSchema(coreMediaHeadlessServerEndpoint(), {
      loaders: [new UrlLoader()],
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
      subschemas: [wrapSchema({ schema: coreMediaSchema, executor: executor }), catalogSchema],
      resolvers: resolvers(coreMediaSchema, catalogSchema),
      typeDefs: linkSchemaDefs,
    });
  } catch (error) {
    logger.error("Could not retrieve and stitch schemas.");
    logger.error(error, error.message);
    process.exit(1);
  }
};

// Executor to query subschema endpoint. Forwards headers from the context
const executor: Executor = async ({ document, variables, context }) => {
  const query = print(document);
  const newHeaders = { ...context.request.headers };
  // remove host header to prevent issues with subschema service accepting it.
  newHeaders["host"] = "";
  // set correct content length for changed request.
  newHeaders["content-length"] = JSON.stringify({ query, variables }).length;
  const fetchResult = await fetch(coreMediaHeadlessServerEndpoint(), {
    method: context.request.method,
    headers: {
      ...newHeaders,
    },
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
};

const coreMediaHeadlessServerEndpoint = () => {
  let coreMediaEndpoint = process.env.COREMEDIA_ENDPOINT || "";
  // use local headless server as fallback in development
  if (!coreMediaEndpoint && process.env.NODE_ENV !== "production") {
    coreMediaEndpoint = "http://localhost:41180/graphql";
  }
  // check for missing graphql
  if (!coreMediaEndpoint.endsWith("/graphql")) {
    coreMediaEndpoint = `${coreMediaEndpoint}/graphql`;
  }
  return coreMediaEndpoint;
};

const commerceCatalogEndpoint = () => {
  let catalogEndpoint = process.env.CATALOG_ENDPOINT || "";
  // use local headless server as default in development
  if (!catalogEndpoint && process.env.NODE_ENV !== "production") {
    catalogEndpoint = "http://localhost:5000/graphql";
  }
  // check for missing graphql
  if (!catalogEndpoint.endsWith("/graphql")) {
    catalogEndpoint = `${catalogEndpoint}/graphql`;
  }
  return catalogEndpoint;
};

const proxyEndpoint = () => {
  return coreMediaHeadlessServerEndpoint().replace("/graphql", "");
};

const createServer = async (schema) => {
  const app = express()
    .disable("x-powered-by")
    .use(cors())
    .use(
      "/caas",
      proxy(proxyEndpoint(), {
        limit: "25mb",
        proxyReqPathResolver: (req) => {
          return "/caas" + req.url;
        },
      })
    );

  if (process.env.COREMEDIA_STITCHING_ENABLE_GRAPHIQL) {
    app.use("/graphiql", graphqlHTTP({ schema, graphiql: { defaultQuery: defaultQueryString } }));
  }

  if (process.env.NODE_ENV === "production") {
    app.use(createActuator());
  }

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: schema,
    introspection: true,
    context: ({ req }) => ({
      request: req,
    }),
    plugins: [
      process.env.COREMEDIA_STITCHING_ENABLE_APOLLO_STUDIO || false
        ? ApolloServerPluginLandingPageLocalDefault({ footer: false })
        : ApolloServerPluginLandingPageProductionDefault({ footer: false }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  return httpServer;
};

const startServer = (app: Server, port = 4000, host = "localhost") => {
  app.listen(port, () => logger.info(`Stitching server started on: http://${host}:${port}/graphql`));
};

// start the server after retrieving the schemas and stitching them
makeGatewaySchema().then((schema) => {
  createServer(schema).then((app) => {
    startServer(app);
  });
});
