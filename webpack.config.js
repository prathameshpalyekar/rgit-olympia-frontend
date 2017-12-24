var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: [
        './app/main.js', // Your appʼs entry point
    ],
    cache: true,
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        root: path.resolve('./app/'),
        extensions: ['', '.js', '.jsx']
    },
    module: {
        noParse: /node_modules\/dist/,
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'react', 'stage-0'],
                    env: {
                        development: {
                            plugins: [
                                ['react-transform', {
                                    transforms: [{
                                        transform: 'react-transform-catch-errors',
                                        imports: ['react', 'redbox-react']
                                    }]
                                }]
                            ]
                        },
                        production: {
                            plugins: [
                                'transform-react-remove-prop-types',
                                'transform-react-constant-elements',
                                'transform-decorators-legacy',
                            ]
                        }
                    }
                }
            },
            {
                test: /\.html/,
                loader: 'html'
            },
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract(
                    'css?root=assets&sourceMap!' +
                    'autoprefixer!' +
                    'less?sourceMap'
                )
            },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?\S*)?$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.gif/,
                loader: "file-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                loader: "file-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                loader: "file-loader?limit=10000&mimetype=image/png"
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style', 'style.css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
    ]
};
