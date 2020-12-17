const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./public/js/slider.js",
  output: {
    filename: "slider.js",
    path: path.resolve(__dirname, "public/dist"),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
            },
          },
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

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
  target: "node",
};
