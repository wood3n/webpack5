const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: {
      import: "./src/index.jsx",
      filename: "main.[contentHash].js",
      dependOn: "react-vendors",
    },
    test: {
      import: "./src/test.jsx",
      filename: "test.[contentHash].js",
      dependOn: "react-vendors",
    },
    "react-vendors": ["react", "react-dom"],
  },
  output: {
    filename: "[name].[contentHash].js",
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
  plugins: [new CleanWebpackPlugin()],
};
