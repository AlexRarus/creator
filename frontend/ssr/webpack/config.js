import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import fs from "fs";
import TerserPlugin from 'terser-webpack-plugin';
import dotenv from 'dotenv'

import paths from "./paths";
import modules from "./modules";


const nodeModules = {};
fs.readdirSync("node_modules")
  .filter((x) => [".bin"].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

// todo определять из окружения
const isEnvProduction = process.env.NODE_ENV === 'production';

export default function () {
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      'isomorphic-style-loader',
      !isEnvProduction && require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: true,
            root: paths.appPath,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }

    return loaders;
  };

  return {
    entry: {
      ssr: [
        "babel-polyfill",
        path.join(process.cwd(), "ssr", "index.tsx"),
      ],
    },
    output: {
      publicPath: '',
      path: path.join(process.cwd(), "build-ssr"),
      filename: "[name].js",
      chunkFilename: '[name].[hash:8].chunk.js',
      clean: true,
    },
    // Control how source maps are generated
    mode: isEnvProduction ? 'production' : 'development',
    devtool: isEnvProduction ? 'source-map' : 'eval',
    target: 'node',
    // target: "browserslist:node 16.1",
    externals: nodeModules,
    // experiments: {
    //   outputModule: true,
    // },
    resolve: {
      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      // где искать модули при подключении "import SomeClass from './SomeClass';"
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        ...(modules.webpackAliases || {}),
      }
    },
    module: {
      noParse: /\.DS_Store/,
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'styled-components',
              '@babel/transform-runtime',
            ],
          },
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.mp4$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: '10000',
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: paths.appPath,
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                // @remove-on-eject-begin
                babelrc: false,
                configFile: false,
                presets: [require.resolve('babel-preset-react-app')],

                // @remove-on-eject-end
                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                  'styled-components',
                ],
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            {
              test: /\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: true,
              }),
              sideEffects: true,
            },

            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
                sourceMap: !isEnvProduction,
              },
            },
            {
              test: /\.svg$/,
              use: ['@svgr/webpack'],
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isEnvProduction,
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
            // Added for profiling in devtools
            keep_classnames: true,
            keep_fnames: true,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          }
        }),
      ],

      splitChunks: isEnvProduction
        ? {
          chunks: 'all',
        }
        : undefined,
    },
    plugins: [
      new MiniCssExtractPlugin(),
      // new FaviconsPlugin(path.join(paths.appPath, 'favicon.png')),
      new webpack.DefinePlugin({
        "process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV),
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.SSR_PORT": JSON.stringify(process.env.SSR_PORT),
        "process.env.SSR_API_URL": JSON.stringify(process.env.SSR_API_URL || dotenv.config().parsed.SSR_API_URL),
      }),
    ],
  }
};
