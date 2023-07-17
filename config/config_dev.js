const config = require('./config_global');
config.hostname = `http://localhost:${config.port}`;

if (process.env.DB_CONN_STR != null) {
  config.mongo.connection_string = `mongodb://${process.env.DB_CONN_STR}/${config.mongo.db}`;
}

module.exports = config;
