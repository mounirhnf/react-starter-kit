//------------------------------------------------------------------------------
// This app is configured to use typescript and sass modules.
// See https://webpack.js.org/concepts/ on how to configure this file.
//------------------------------------------------------------------------------

'use-strict';

//------------------------------------------------------------------------------

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// Configure envirement (NOTE: This must be done as early as pissible)
require('dotenv').config();

//------------------------------------------------------------------------------

const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CheckPortPlugin = require('./plugins/check-port');
const BuildFolderWiper = require('./plugins/build-wiper');

const paths = require('./paths');

//------------------------------------------------------------------------------

const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

//------------------------------------------------------------------------------

const requiredFiles = [paths.template, paths.index];

if (!checkRequiredFiles(requiredFiles)) {
  process.exit(1);
}

//------------------------------------------------------------------------------

const mainTsRejex = /\.(ts|tsx)$/;
const assetsRejex = /\.(jpg|jpeg|png|gif|mp3|mp4|svg)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

//------------------------------------------------------------------------------

module.exports = function(_, webpackEnv) {
  const isDevelopment = webpackEnv.mode === 'development';
  const isProduction = webpackEnv.mode === 'production';
  const isProfile = process.argv.includes('--profile'); 
  const isProductionProfile = isProduction && isProfile;
  const port = process.env.PORT || 8080;

  const getStyleLoaders = () => {
    return [
      isDevelopment && 'style-loader',
      isProduction && MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          esModule: true,
          modules: {
            localIdentName: isDevelopment
              ? '[folder]_[local]_[hash:base64:4]'
              : '[hash:base64:5]',
          },
          sourceMap: isDevelopment,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              autoprefixer(),
            ]
          },
        }
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: require('sass'),
          sourceMap: isDevelopment,
        },
      },
    ].filter(Boolean);
  };

  return {
    target: 'web',
    entry: paths.index,
    output: {
      path: paths.build,
      filename: isDevelopment
        ? 'static/js/[name].js'
        : isProduction && 'static/js/[name].[contenthash:8].js',
      chunkFilename: isDevelopment
        ? 'static/js/[name].chunk.js'
        : isProduction && 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: '/',
      assetModuleFilename: 'assets/[hash][ext]'
    },
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
      client: {
        logging: 'none',
        overlay: { // Show only errors on the browser
          errors: true,
          warnings: false,
        },
      },
      headers: [ // Security headers
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; preload',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-Frame-Options',
          value: 'deny',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
      historyApiFallback: true, // Nessessary for react router to work
      host: '0.0.0.0', // Allow local network access to the server
      hot: true,
      port,
    },
    module: {
      rules: [
        {
          test: mainTsRejex,
          exclude: /node_modules/,
          use: [
            'ts-loader',
            {
              loader: 'eslint-loader',
              options: {
                formatter: eslintFormatter,
              },
            },
          ],
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(),
        },
        {
          test: sassModuleRegex,
          use: getStyleLoaders(),
        },
        {
          test: assetsRejex,
          exclude: [/node_modules/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static/media',
                name: '[name].[contenthash:8].[ext]'
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.ts', '.tsx'],
      modules: [
        paths.src,
        paths.modules,
      ],
      fallback: {
        contentBase: paths.build,
        events: false,
        url: false,
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isProductionProfile,
            keep_fnames: isProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
            sourceMap: false,
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.template,
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
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          const entrypointFiles = entrypoints.main.filter((fileName) => {
            return !fileName.endsWith('.map');
          });

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.public,
            to: '.',
          },
        ],
      }),
      isDevelopment && new CheckPortPlugin(port),
      isProduction && new BuildFolderWiper(paths.build),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(webpackEnv.mode),
      }),
      new webpack.EnvironmentPlugin([
        // Pass all public env variables here
      ]),
    ].filter(Boolean),
  }
}
