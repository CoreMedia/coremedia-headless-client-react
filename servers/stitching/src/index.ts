import logger from "./logger";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import { resolvers } from "./resolvers";
import { stitchSchemas } from "@graphql-tools/stitch";
import "dotenv/config";
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
import { wrapSchema } from "@graphql-tools/wrap";
import { graphqlHTTP } from "express-graphql";
import { defaultQueryString } from "./graphiqlDefaultQuery";
import { executor } from "./executor";
import { commerceCatalogEndpoint, coreMediaHeadlessServerEndpoint, proxyEndpoint } from "./endpoints";

const fetchSchemas = async () => {
  try {
    logger.info("Fetching schemas from both GraphQL endpoints");

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
      subschemas: [wrapSchema({ schema: coreMediaSchema, executor: executor }), catalogSchema],
      resolvers: resolvers(wrapSchema({ schema: coreMediaSchema, executor: executor }), catalogSchema),
      typeDefs: linkSchemaDefs,
    });
  } catch (error) {
    logger.error("Could not retrieve and stitch schemas.");
    logger.error(error, error.message);
    process.exit(1);
  }
};

const createServer = async (schema) => {
  // create express server with cors
  const app = express().disable("x-powered-by").use(cors());

  // add graphiql endpoint
  if (process.env.COREMEDIA_STITCHING_ENABLE_GRAPHIQL) {
    app.use("/graphiql", graphqlHTTP({ schema, graphiql: { defaultQuery: defaultQueryString } }));
  }

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
fetchSchemas().then((schema) => {
  createServer(schema).then((app) => {
    startServer(app);
  });
});
