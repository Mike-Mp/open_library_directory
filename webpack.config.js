const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    slider: "./public/js/slider.js",
    imageSlider: "./public/js/imageSlider.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/dist"),
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
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

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  target: "node",
};
