/*jslint
    node
*/
module.exports = {
    entry: "./scripts/app.ts",
    output: {
        filename: "built/bundle.js",
        sourcePrefix: ""
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "tslint"
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ],

        resolve: {
            extensions: ['', '.js', '.ts']
        }
    }
};