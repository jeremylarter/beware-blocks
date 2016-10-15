/*jslint
    node
*/
module.exports = {
    entry: "./built/app.js",
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

        resolve: {
            extensions: ['', '.js']
        }
    }
};