const path = require("path");

module.exports = {
  entry: {
    "coremedia.preview": ["./src/preview.js", "./src/placement-highlighting.js"],
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
      // embedd css into javascript
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
};
