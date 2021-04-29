import { delegateToSchema } from "@graphql-tools/delegate";
import { GraphQLResolveInfo, GraphQLSchema, Kind } from "graphql";
import { WrapQuery } from "@graphql-tools/wrap";
import logger from "./logger";

export const resolvers = (coreMediaSchema: GraphQLSchema, catalogSchema: GraphQLSchema) => {
  return {
    ProductRef: {
      product: {
        selectionSet: `{ externalId, siteId }`,
        resolve(product, args: Record<string, string>, context: Record<string, string>, info: GraphQLResolveInfo) {
          const externalId = product.externalId;
          const siteId = product.siteId;
          logger.debug("ProductRef#product " + externalId + ":" + siteId);
          return delegateToSchema({
            schema: catalogSchema,
            operation: "query",
            fieldName: "product",
            args: {
              externalId: externalId,
              siteId: siteId,
            },
            context: context,
            info: info,
          });
        },
      },
    },
    CategoryRef: {
      category: {
        selectionSet: `{ externalId, siteId }`,
        resolve(category, args: Record<string, string>, context: Record<string, string>, info: GraphQLResolveInfo) {
          const externalId = category.externalId;
          const siteId = category.siteId;
          logger.debug("CategoryRef#category " + externalId + ":" + siteId);
          return delegateToSchema({
            schema: catalogSchema,
            operation: "query",
            fieldName: "category",
            args: {
              categoryId: externalId,
              siteId: siteId,
            },
            context: context,
            info: info,
          });
        },
      },
    },
    CategoryImpl: {
      augmentation: {
        selectionSet: `{ externalId, siteId }`,
        resolve(category, args: Record<string, string>, context: Record<string, string>, info: GraphQLResolveInfo) {
          const externalId = category.externalId;
          const siteId = category.siteId; // consider info.variableValues.siteId if not available
          logger.debug("CategoryImpl#augmentation " + externalId + ":" + siteId);
          return delegateToSchema({
            schema: coreMediaSchema,
            operation: "query",
            fieldName: "commerce",
            context,
            info,
            transforms: [
              new WrapQuery(
                ["commerce"],
                (subtree) => ({
                  kind: Kind.SELECTION_SET,
                  selections: [
                    {
                      kind: Kind.FIELD,
                      name: {
                        kind: Kind.NAME,
                        value: "categoryAugmentationBySite",
                      },
                      arguments: [
                        {
                          kind: Kind.ARGUMENT,
                          name: { kind: Kind.NAME, value: "externalId" },
                          value: { kind: Kind.STRING, value: externalId },
                        },
                        {
                          kind: Kind.ARGUMENT,
                          name: { kind: Kind.NAME, value: "siteId" },
                          value: {
                            kind: Kind.STRING,
                            value: siteId,
                          },
                        },
                      ],
                      selectionSet: subtree,
                    },
                  ],
                }),
                (result) => result && result.categoryAugmentationBySite
              ),
            ],
          });
        },
      },
    },
    ProductImpl: {
      augmentation: {
        selectionSet: `{ externalId, siteId }`,
        resolve(product, args: Record<string, string>, context: Record<string, string>, info: GraphQLResolveInfo) {
          const externalId = product.externalId;
          const siteId = product.siteId; // consider info.variableValues.siteId if not available
          logger.debug("ProductImpl#augmentation " + externalId + ":" + siteId);
          return delegateToSchema({
            schema: coreMediaSchema,
            operation: "query",
            fieldName: "commerce",
            context,
            info,
            transforms: [
              new WrapQuery(
                ["commerce"],
                (subtree) => ({
                  kind: Kind.SELECTION_SET,
                  selections: [
                    {
                      kind: Kind.FIELD,
                      name: {
                        kind: Kind.NAME,
                        value: "productAugmentationBySite",
                      },
                      arguments: [
                        {
                          kind: Kind.ARGUMENT,
                          name: { kind: Kind.NAME, value: "externalId" },
                          value: { kind: Kind.STRING, value: externalId },
                        },
                        {
                          kind: Kind.ARGUMENT,
                          name: { kind: Kind.NAME, value: "siteId" },
                          value: {
                            kind: Kind.STRING,
                            value: siteId,
                          },
                        },
                      ],
                      selectionSet: subtree,
                    },
                  ],
                }),
                (result) => result && result.productAugmentationBySite
              ),
            ],
          });
        },
      },
    },
  };
};
