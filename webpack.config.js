const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: {
      import: "./src/index.jsx",
      filename: "main.[contenthash:8].js",
      dependOn: "react-vendors",
    },
    test: {
      import: "./src/test.jsx",
      filename: "test.[contenthash:8].js",
      dependOn: "react-vendors",
    },
    "react-vendors": ["react", "react-dom"],
  },
  // entry: {
  //   main: "./src/index.jsx",
  //   test: "./src/test.jsx",
  // },
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            // 如果在class组件中使用属性或者箭头函数之类的语法，必须要引入这个plugin
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "index.html",
          chunks: ["main", "react-vendors"],
          filename: "main.html",
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    ),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "index.html",
          chunks: ["test", "react-vendors"],
          filename: "test.html",
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    ),
    new CleanWebpackPlugin(),
  ],
};
