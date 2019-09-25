/* eslint-disable */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const outputPath = path.resolve('./lib');
const entry = path.resolve('src', 'index.tsx');
const babelrc = path.resolve('../../', '.babelrc');
const tsconfig = path.resolve('./tsconfig.json');

module.exports = {
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.jsx', '.json'
    ]
  },
  entry,
  output: {
    filename: 'index.js',
    path: outputPath,
    publicPath: '/',
    library: 'ace',
    libraryTarget: 'umd'
  },
  externals: [
    nodeExternals({
      modulesFromFile: {
        include: ['dependencies', 'peerDependencies']
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: babelrc
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: tsconfig
            }
          },
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
              name: 'images/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: babelrc
            }
          },
          'react-svg-loader'
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
};
