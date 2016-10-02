/*jslint
    node
*/
var productionConfig = require("./webpack.config.js");

productionConfig.output.filename = "built/bundle.min.js";

module.exports = productionConfig;