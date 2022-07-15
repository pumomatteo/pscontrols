// @ts-nocheck
'use strict';
const path = require('path');

var JavaScriptObfuscator = require('webpack-obfuscator');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/**@type {import('webpack').Configuration}*/
const config = {
  mode: 'production',
  entry: // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    [
      './src/ui/vr.ts'
    ],
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve('./dist'),
    filename: 'vrcontrols.all.min.js',
    libraryTarget: 'umd',
    library: "vr",
    globalObject: 'this',
    umdNamedDefine: true
  },
  devtool: 'source-map', //force create source map
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts']
  },
  externals: {
    MobileDetect: './definitions/mobile-detect.d.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'           
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin(
      {
        terserOptions: {
          warnings: false,//'verbose',
          output: {
            comments: false
          }
        },
      }
    )],
  },  
};
module.exports = config;