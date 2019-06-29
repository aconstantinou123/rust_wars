const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
     app: "./bootstrap.js",
    },
  plugins: [
     // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(['index.html']),
    ],
    output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  }
};