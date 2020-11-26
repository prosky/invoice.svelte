const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VirtualModulesPlugin = require("webpack-virtual-modules");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {HotModuleReplacementPlugin, SourceMapDevToolPlugin} = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
//const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");


const ROOT_PATH = resolve(__dirname);
const SRC_DIR = resolve(ROOT_PATH, 'src');
const BUILD_DIR = resolve(ROOT_PATH, 'build');
const NODE_MODULES_DIR = resolve(ROOT_PATH, 'node_modules');
const SVELTE_DIR = resolve(NODE_MODULES_DIR, 'svelte');
/**
 *
 * @param env
 * @returns webpack.Configuration
 */
module.exports = (env = {}) => {
    console.log({env});
    const DEVELOPMENT = process.env.NODE_ENV === 'development';
    const PRODUCTION = !DEVELOPMENT;
    const DEV_SERVER = env.WEBPACK_SERVE;
    const HASH = DEV_SERVER ? '' : '.[contenthash:8]';
    console.log({DEVELOPMENT,PRODUCTION,DEV_SERVER,HASH});
    /*const smp = new SpeedMeasurePlugin({
        disable: false//PRODUCTION
    });*/
    return /*smp.wrap*/({
        entry: resolve(SRC_DIR, 'index.js'),
        devServer: {
            open: true,
            //compress: true,
            hot: true,
            inline: true,
            //watchContentBase: true,
            contentBase: BUILD_DIR,
            publicPath: '',
            historyApiFallback: true,
            port: 5000
        },
        mode: PRODUCTION ? 'production' : 'development',
        devtool: 'source-map',
        output: {
            filename: `[name]${HASH}.js`,
            chunkFilename: `[name][id]${HASH}.js`,
            path: BUILD_DIR,
        },
        resolve: {
            alias: {
                svelte: SVELTE_DIR,
                app: resolve(SRC_DIR, 'app'),
                components: resolve(SRC_DIR, 'components'),
            },
            extensions: [".mjs", ".js", ".ts", ".svelte", '.css', '.scss'],
            mainFields: ['svelte', 'browser', 'module', 'main'],
        },
        stats: {
            colors: true
        },
        optimization: {
            usedExports: PRODUCTION,
        },
        module: {
            rules: [
                {test: /.m?js$/, type: 'javascript/auto'},
                {
                    test: /\.(?:svelte|m?jsx?|tsx?)$/,
                    resolve: {
                        fullySpecified: false // load Svelte correctly
                    },
                    include: [SRC_DIR, SVELTE_DIR, resolve(NODE_MODULES_DIR, 'simple-common-utils')],
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        configFile: resolve(ROOT_PATH, '.babelrc.js')
                    },
                },
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                    //exclude: /node_modules/,
                },
                {
                    test: /\.s?css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("node-sass"),
                            },
                        }
                    ]
                },
                {
                    test: /\.(svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: DEV_SERVER ? '[path][name].[ext]' : `assets/[name]${HASH}.[ext]`,
                            }
                        },
                    ]
                },
                {
                    test: /\.(svelte)$/,
                    //exclude: /node_modules/,
                    resolve: {
                        fullySpecified: false // load Svelte correctly
                    },
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            dev: DEV_SERVER,
                            emitCss: true,
                            preprocess: require('svelte-preprocess')({
                                scss: {
                                    includePaths: ['src/scss'],
                                },
                            })
                        },
                    },
                },
            ],
        },
        plugins: [
            new ProgressBarPlugin(),
            !DEV_SERVER && new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*', '!static*'],
            }),
            new SourceMapDevToolPlugin({
                filename: 'sourcemaps/[file].map',
            }),
            env.analyze && new BundleAnalyzerPlugin(),
            new VirtualModulesPlugin(),
            DEV_SERVER && new HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                filename: resolve(BUILD_DIR, 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: `[name]${HASH}.css`,
                chunkFilename: `[id]${HASH}.css`
            }),
        ].filter(Boolean)
    })
}