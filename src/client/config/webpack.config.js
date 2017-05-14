const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const clientRoot = path.resolve("src", "client");

module.exports = {
  devtool: "cheap-module-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/client/src/index.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve("client-dist"),
    publicPath: "http://localhost:8080/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ["babel-loader"],
        include: clientRoot,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["./node_modules"],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(clientRoot, "public", "index.html"),
    }),
  ],
  devServer: {
    publicPath: "http://localhost:8080/",
    hot: true,
    historyApiFallback: true,
    host: "localhost",
    port: 8080,
    proxy: {
      "/graphql": { target: "http://localhost:3000" },
      "/auth-login": { target: "http://localhost:3000" },
    },
  },
};
