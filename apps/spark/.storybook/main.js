const path = require('path');
const ViewLoaderPlugin = require("@coremedia-labs/view-dispatcher/ViewLoaderPlugin");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    },{
      test: /\.(js|jsx)$/,
      exclude: filename => {
        return /node_modules/.test(filename) && !/react-leaflet/.test(filename)
      },
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ],
        plugins: [
          "@babel/plugin-proposal-nullish-coalescing-operator",
        ],
      },
    });

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
