const path = require("path");

module.exports = {
  entry: {
    previewProtocol: ["./src/previewProtocol.js"],
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'babel-loader'.
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
