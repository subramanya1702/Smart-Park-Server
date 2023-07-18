const config = {};
config.port = 8080;
config.maxTries = 5;
config.hostname = `http://localhost:${config.port}`;

config.mongo = {};
config.mongo.db = 'plv_detection_data';
config.mongo.connection_string = 'mongodb://localhost:27017/' + config.mongo.db;

module.exports = config;
