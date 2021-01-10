const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    styles: "./public/css/styles.css",
    glideCore: "./public/css/glide.core.min.css",
    glideTheme: "./public/css/glide.theme.min.css",
    index: "./public/css/index.css",
  },
  output: {
    filename: "[name].css",
    path: path.resolve(__dirname, "public/dist"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  resolve: {
    alias: {
      path: require.resolve("path-browserify"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
    },
  },

  plugins: [new MiniCssExtractPlugin()],
  target: "node",
};
