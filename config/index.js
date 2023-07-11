const env = process.env.NODE_ENV || "dev";
const config = require("./config_" + env);

module.exports = config;