const { merge } = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    writeToDisk: true
  },
  plugins: [
    // 使用 CopyWebpackPlugin
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'assets'), to: 'assets' }
      ]
    })
  ],
  output: {
    path: path.join(__dirname, 'dist')
  }
});
