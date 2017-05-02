const webpack = require('webpack');
const path = require('path');

module.exports = {
  // watch: true,
  entry: {
    ApolloClient: './config/ApolloClient.js',
    createNetworkInterface: './config/createNetworkInterface.js',
    Redux: './config/Redux.js',
  },
  output: {
    path: path.join(__dirname, 'build/Libs'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
