const path = require('path');
const ViewLoaderPlugin = require("@coremedia-labs/view-dispatcher/ViewLoaderPlugin");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  staticDirs: [
    '../public'
  ],
  framework: "@storybook/react",
  core: {
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    config.plugins.push(
      new ViewLoaderPlugin({
        root: path.resolve(__dirname, "../"),
        viewPattern: path.resolve(__dirname, "../src/components/**/views/*.tsx"),
        viewDispatcherImportCode: `import { viewDispatcher } from ${JSON.stringify(
          path.resolve(__dirname, "../src/utils/ViewDispatcher/Include")
        )};`,
      }),
    );

    // Return the altered config
    return config;
  },
};
