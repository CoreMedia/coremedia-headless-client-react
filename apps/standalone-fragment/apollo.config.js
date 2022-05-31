module.exports = {
  client: {
    exclude: ["node_modules/*"],
    includes: ["src/**/*.ts", "../app/src/queries/**/*.ts"],
    service: {
      name: "headless",
      localSchemaFile: "../../packages/graphql-layer/src/__downloaded__/schema.json",
    },
    tagName: "gql",
    passthroughCustomScalars: true,
    customScalarsPrefix: "CoreMedia",
  },
};
