const cron = require('node-cron');
const ParkingLotHistory = require('../model/ParkingLotHistory');
const config = require('../config');

/**
 * Cleans up ogImage and predImage fields from documents which were created
 * before current date time in parkingLotHistory collection
 */
function cleanUpParkingLotHistory() {
  console.log('Running the scheduler...');
  const currentTime = Math.floor(Date.now() / 1000);

  ParkingLotHistory.updateMany(
    {timestamp: {$lte: currentTime}},
    {
      $unset: {ogImage: null, predImage: null},
    },
  )
    .exec()
    .then((res) => {
      if (res == null) {
        console.log('Result object is null! Scheduler might not have cleaned up the records.');
      } else {
        console.log(`Cleaned up ${res['modifiedCount']} records`);
      }
    });
}

const cronJob = cron.schedule(config.cron, function() {
  // Execute the clean-up function only for non-test environments
  if (config.env !== 'test') {
    cleanUpParkingLotHistory();
  }
});

module.exports = {cronJob, cleanUpParkingLotHistory};
