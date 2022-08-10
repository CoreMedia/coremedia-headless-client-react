const path = require("path");
const { whenDev } = require("@craco/craco");
const ViewLoaderPlugin = require("@coremedia-labs/view-dispatcher/ViewLoaderPlugin");
require("dotenv").config();

module.exports = {
  devServer: whenDev(() => ({
    proxy: {
      '/caas': {
        target: process.env.REACT_APP_API_ENDPOINT || "http://localhost:4000",
        secure: false,
        changeOrigin: true,
      },
    }
  })),
  webpack: {
    configure: (webpackConfig, {paths}) => {
      paths.appBuild = webpackConfig.output.path = path.resolve(__dirname, "dist");
      return webpackConfig;
    },
    plugins: [
      new ViewLoaderPlugin({
        root: __dirname,
        viewPattern: path.resolve(__dirname, "src/components/**/views/*.tsx"),
        viewDispatcherImportCode: `import { viewDispatcher } from ${JSON.stringify(
          path.resolve(__dirname, "src/utils/ViewDispatcher/Include")
        )};`,
      }),
    ],
  },
};
