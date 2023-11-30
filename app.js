const express = require('express');
const mongoose = require('mongoose');
const parkingLotRouter = require('./route/ParkingLotRoute');
const config = require('./config');
const cleanUpScheduler = require('./scheduler/CleanUpDbScheduler');

const url = config.mongo.connection_string;
let maxTries = 0;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/parking_lots', parkingLotRouter);

/**
 * Connects to mongo database.
 * Logs any connection errors.
 */
function connectToDb() {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  ).then(() => {
    console.log(`Connected to MongoDB: ${url}`);
  }).catch((err) => {
      maxTries++;
      console.log(`Attempt ${maxTries}. Unable to connect to MongoDB.\n${err}`);

      if (maxTries === config.maxTries) {
        process.exit(1);
      }

      setTimeout(connectToDb, 10000);
    },
  );
}

/**
 * Entrypoint
 */
function main() {
  connectToDb();

  cleanUpScheduler.cronJob.start();

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

main();

module.exports = app;
