const path = require("path");
const ViewLoaderPlugin = require("@coremedia/view-dispatcher/ViewLoaderPlugin");

module.exports = {
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
