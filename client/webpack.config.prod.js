const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    mode: "production",
    output: {
        path: path.resolve(__dirname, '../server/public'),
        filename: 'app.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(m?|jsx?)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../server/public/index.html'),
            hash: true,
            inject: 'body',
        }),
    ]
}