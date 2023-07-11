let config = require("./config_global");
config.mongo.connection_string = "mongodb://127.0.0.1:27017/" + config.mongo.db;
config.hostname = "http://localhost:8080";

module.exports = config;