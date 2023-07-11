let config = require("./config_global");
config.env = "test";
config.mongo.connection_string = "test.connection.string:27017";

module.exports = config;