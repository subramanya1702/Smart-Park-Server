const config = require('./config_global');

if (process.env.DB_CONN_STR != null) {
  config.mongo.connection_string = `mongodb://${process.env.DB_CONN_STR}/${config.mongo.db}`;
}

if (process.env.SERVER_HOSTNAME != null) {
  config.hostname = `http://${process.env.SERVER_HOSTNAME}:${config.port}`;
}

module.exports = config;
