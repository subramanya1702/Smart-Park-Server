const config = require('./config_global');
config.env = 'test';
config.mongo.connection_string = 'mongodb://127.0.0.1:27017/' + config.mongo.db;
config.hostname = 'test.host.com';

module.exports = config;
