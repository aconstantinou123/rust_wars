const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
     app: "./bootstrap.js",
    },
    module: {
      rules: [
        {
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            use: 'file-loader'
        },
        {
          test: /\.(png|jpg|ttf)$/,
          use: [
             { loader: 'url-loader', options: { limit: 5000192 } }
          ]
        },
      ]
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