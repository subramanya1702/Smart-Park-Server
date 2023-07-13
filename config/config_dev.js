const config = require('./config_global');
config.mongo.connection_string = 'mongodb://mongo:27017/' + config.mongo.db;
config.hostname = 'http://localhost:8080';

module.exports = config;
