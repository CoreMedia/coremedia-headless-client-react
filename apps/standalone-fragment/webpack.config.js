const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

process.env.NODE_ENV = "production";

const copyPlugin = new CopyPlugin({
  patterns: [
    {from: "public"},
  ],
});

module.exports = {
  entry: {
    "cm-headless-fragment": ["./src/index.tsx"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "headlessFragment",
  },
  //devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    mainFields: ["main:src", "browser", "module", "main"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    copyPlugin
  ],
  performance: {
    hints: false
  }
};
