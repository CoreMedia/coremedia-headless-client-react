const path = require("path");
const dotenv = require("dotenv");

const ViewLoaderPlugin = require("@coremedia-labs/view-dispatcher/ViewLoaderPlugin");
const { whenDev } = require("@craco/craco");
dotenv.config();

module.exports = {
  devServer: whenDev(() => ({
    proxy:{
      '/caas': {
        target: process.env.REACT_APP_API_ENDPOINT,
        secure: false,
        changeOrigin: true,
      },
    }
  })),
  webpack: {
    output: {
      path: path.resolve(__dirname, "build"),
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
