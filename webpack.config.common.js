var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader' }]
            },
            {
                test: /\.scss$/,
                use:[
                    { loader: 'to-string-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ],
        exprContextCritical: false

    },

    plugins : [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            './chart'
        )//,
        //new BundleAnalyzerPlugin()
    ]
};