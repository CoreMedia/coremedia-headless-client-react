module.exports = {
  client: {
    exclude: ["node_modules/*"],
    includes: ["src/**/*.ts"],
    service: {
      name: "headless",
      localSchemaFile: "./src/__downloaded__/schema.json",
    },
    tagName: "gql",
    passthroughCustomScalars: true,
    customScalarsPrefix: "CoreMedia",
  },
};
