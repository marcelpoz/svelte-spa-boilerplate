// Modules
const chalk = require('chalk');
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SveltePreprocess = require('svelte-preprocess');

// Dirs
const srcDir = path.resolve(__dirname, '../src');
const distDir = path.resolve(__dirname, '../dist');

// Config
module.exports = env => {
  return {
    mode: env.dev ? 'development' : 'production',
    entry: `${srcDir}/index.js`,
    output: {
      path: distDir,
      filename: env.dev ? 'js/[name].js' : 'js/[name]-[contenthash:7].min.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: env.dev ? ['cache-loader', 'babel-loader'] : 'babel-loader',
        },
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              hotReload: true,
              preprocess: SveltePreprocess({
                postcss: true,
                sass: true,
              }),
            },
          },
        },
        {
          test: /\.(sc|sa|c)ss$/,
          exclude: /(node_modules)/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${srcDir}/index.html`,
        filename: `${distDir}/index.html`,
        inject: true,
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
      }),
      new HtmlWebpackHarddiskPlugin(),
      new ProgressBarPlugin({
        complete: chalk.green('■'),
        // eslint-disable-next-line prettier/prettier
        format: `🤔  Webpack is :msg [:bar] ${chalk.blue.bold(':percent')} ${chalk.yellow('(:elapsed seconds)')}`,
      }),
    ],
    resolve: {
      alias: {
        '@': srcDir,
        svelte: path.resolve('node_modules', 'svelte'),
      },
      cacheWithContext: false,
      extensions: ['.js', '.jsx', '.svelte'],
    },
  };
};
