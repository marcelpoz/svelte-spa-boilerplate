// Modules
const chalk = require('chalk');
const path = require('path');
const merge = require('webpack-merge');

// Plugins
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Base config
const baseConf = require('./webpack.base.js');

// Directories
// const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');

module.exports = env => {
  return merge(baseConf(env), {
    devtool: 'eval',
    stats: 'minimal',
    devServer: {
      compress: true,
      inline: true,
      port: 3000,
      contentBase: distDir,
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        },
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            chalk.hex('#ffa500')('🎉   Check out your svelte app here  👉🏻  http://localhost:3000'),
          ],
        },
      }),
      new HardSourceWebpackPlugin(),
      new StyleLintPlugin({
        configFile: path.resolve(__dirname, '../.stylelintrc'),
        syntax: 'scss',
      }),
    ],
  });
};
