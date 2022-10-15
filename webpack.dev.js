const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
    return {
        mode: "development",
        plugins:
            [new webpack.ProvidePlugin({
                "React": "react",
            }),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: true,
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("development"),
                    REACT_APP_API: JSON.stringify("http://localhost:8089"),
                    WEB_SOCKET: JSON.stringify("ws://localhost:8089")

                }
            })
        ],
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: ["style-loader",
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },

                        "postcss-loader"],
                },
                {
                    test: /\.(jsx|js)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": "defaults"
                                }],
                                '@babel/preset-react'
                            ]
                        }
                    }]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    include: path.resolve(__dirname, 'src'),
                    type: 'asset/resource',
                }
            ]
        },
        devServer: {
            open: true,
            port: 9009,
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            historyApiFallback: true,
            liveReload: true
        }
    }
}