const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge
    (
        common,
        {
            mode: 'development',
            devtool: 'inline-source-map',
            devServer: {
                static: {
                    directory: path.join(__dirname, 'public'),
                },
                compress: true,
                port: 3000,
                // Important for using react-router-dom
                historyApiFallback: true
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin()
            ]
        }
    );
