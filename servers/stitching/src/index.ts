import makeRemoteExecutor from "./makeRemoteExecutor";
import logger from "./logger";
import { introspectSchema, wrapSchema } from "@graphql-tools/wrap";
import { stitchSchemas } from "@graphql-tools/stitch";
import { config } from "dotenv";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { resolvers } from "./resolvers";
import { defaultQueryString } from "./graphiqlDefaultQuery";
import { createActuator } from "./actuator";

const makeGatewaySchema = async () => {
  config();

  try {
    logger.info("Fetching schemas from both GraphQL endpoints");
    const coreMediaSchema = makeRemoteExecutor(coreMediaHeadlessServerEndpoint());
    const catalogSchema = makeRemoteExecutor(commerceCatalogEndpoint());

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

    const wrappedCatalogSchema = wrapSchema({
      schema: await introspectSchema(catalogSchema),
      executor: catalogSchema,
    });

    const wrappedCoreMediaSchema = wrapSchema({
      schema: await introspectSchema(coreMediaSchema),
      executor: coreMediaSchema,
    });

    return stitchSchemas({
      subschemas: [
        {
          schema: wrappedCatalogSchema,
          executor: catalogSchema,
        },
        {
          schema: wrappedCoreMediaSchema,
          executor: coreMediaSchema,
        },
      ],
      resolvers: resolvers(wrappedCoreMediaSchema, wrappedCatalogSchema),
      typeDefs: linkSchemaDefs,
    });
  } catch (error) {
    logger.error("Could not retrieve and stitch schemas.");
    logger.debug(error, error.message);
    process.exit(1);
  }
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

const createServer = (schema) => {
  const server = express()
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
    )
    .use("/graphql", graphqlHTTP({ schema, graphiql: false }))
    .use("/graphiql", graphqlHTTP({ schema, graphiql: { defaultQuery: defaultQueryString } }));
  if (process.env.NODE_ENV === "production") {
    server.use(createActuator());
  }
  return server;
};

const startServer = (app, port = 4000, host = "localhost") => {
  app.listen(port, () => logger.info(`Stitching server started on: http://${host}:${port}`));
};

// start the server after retrieving the schemas and stitching them
makeGatewaySchema().then((schema) => {
  startServer(createServer(schema));
});
