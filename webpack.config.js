const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
            favicon: './src/assets/favicon.svg',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,   
                use: ['style-loader', 'css-loader'], 
            },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    devServer: {
        static: './dist',
        watchFiles: ['./src/template.html'],
        port: 3000,
        client: {
            webSocketURL: 'ws://localhost:3000/ws',
        },
    },
};
