const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

process.env.NODE_ENV = "production";

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
        test: /\.(ts|js)x?$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(svg|woff|gif|ttf|eot)$/,
        use: {
          loader: "url-loader",
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
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
  ],
};
