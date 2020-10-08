module.exports = {
    server: {
        serviceIP: "http://10.0.0.62:9008",
        port: 3000,//port
        ssr: true,
        browserSupport: 9,
        blockPageName: "hintPage.html",
        assetPath: "./public",
        viewPath: "./views",
        qiniu: {
            domain: "",
            accessKey: "",
            secretKey: "",
            bucket: ""
        }
    },
    webpack: function() {
        var path = require("path");
        const ExtractTextPlugin = require("extract-text-webpack-plugin");
        var extractDemon = new ExtractTextPlugin({
            filename: "demon.css",
            allChunks: true
        });
        var extractSrc = new ExtractTextPlugin({
            filename: "src.css",
            allChunks: true
        });
        var defaultPlugin = require("./lib/config/webpack/plugins");
        var defaultLoader = require("./lib/config/webpack/loader");
        var extThemePath = path.resolve(__dirname, "./src/theme.less");

        var configModuleDebug = {
            loaders: [
                defaultLoader.babel(),
                defaultLoader.css(),
                defaultLoader.less(/^(?!.*?(\\|\/)src(\\|\/)).*less$/, extThemePath),
                defaultLoader.less(/(.*?(\\|\/)src(\\|\/)).*less$/),
                defaultLoader.images()
            ]
        };
        var configModule = {
            loaders: [
                defaultLoader.babel(),
                defaultLoader.css(),
                {
                    test: /^(?!.*?(\\|\/)src(\\|\/)).*less$/,
                    loader: extractDemon.extract(defaultLoader.getlessStr(extThemePath,true))
                },
                {
                    test: /(.*?(\\|\/)src(\\|\/)).*less$/,
                    loader: extractSrc.extract(defaultLoader.getlessStr(null,true))
                },
                defaultLoader.images()
            ]
        };
        return {
            dev: {
                useAnalyzer: false,
                config: {
                    devtool: "cheap-module-eval-source-map",
                    output: {
                        path: path.resolve(__dirname, "./public/project"),
                        filename: "spa.js",
                        publicPath: "/project"
                    },
                    module: configModuleDebug
                }
            },
            release: {
                useAnalyzer: false,
                config: {
                    output: {
                        path: path.resolve(__dirname, "./public/project"),
                        filename: "spa.js",
                        sourceMapFilename: "[file].map",
                        //加这个！
                        chunkFilename: "[name].[chunkhash:5].chunk.js",
                        publicPath: "/project/"
                    },
                    module: configModule,
                    plugins: [
                        extractDemon,
                        extractSrc,
                        defaultPlugin.cssSplitPlugin({ size: 4000, imports: true }),
                        //删除上次打包目录
                        defaultPlugin.cleanWebpackPlugin(["project"], {
                            root: path.join(__dirname, "public"), //一个根的绝对路径.
                            verbose: true,
                            dry: false,
                            exclude: [] ////排除不删除的目录，主要用于避免删除公用的文件
                        }),
                        defaultPlugin.noEmitError(),
                        defaultPlugin.definePlugin(),
                        defaultPlugin.es3ifyPlugin(), // MUST put before uglify or it not work
                        defaultPlugin.uglify(),
                        defaultPlugin.compressPlugin()
                    ]
                }
            },
            useBundle: false
        };
    }
};