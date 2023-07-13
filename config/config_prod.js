const config = require('./config_global');
config.mongo.connection.string = 'mongodb://{REPLACE_WITH_IP_OR_DOMAIN}:27017/' + config.mongo.db;

module.exports = config;
