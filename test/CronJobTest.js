const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const ParkingLotHistory = require('../model/ParkingLotHistory');
const scheduler = require('../scheduler/CleanUpDbScheduler');

describe('DB clean-up scheduler Integration Test', () => {
  let mongoServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const currentTime = Math.floor(Date.now() / 1000);

    const parkingLotHistories = [
      new ParkingLotHistory({
        latitude: '51.22',
        longitude: '-51.22',
        name: 'Lot 1',
        emptySpaces: 0,
        totalSpaces: 20,
        timestamp: currentTime - 1800,
        ogImage: 'og image',
        predImage: 'pred image',
        timeLimit: '9:30AM to 5:30PM',
        charges: 2,
      }),
      new ParkingLotHistory({
        latitude: '41.22',
        longitude: '-41.22',
        name: 'Lot 2',
        emptySpaces: 10,
        totalSpaces: 30,
        timestamp: currentTime - 900,
        ogImage: 'og image',
        predImage: 'pred image',
        timeLimit: '9:30AM to 5:30PM',
        charges: 2.5,
      }),
    ];

    await ParkingLotHistory.insertMany(parkingLotHistories);
  });

  describe('Clean up records with expired timestamps', () => {
    it('it should fetch records with no ogImage and predImage fields in all the documents after clean-up', async () => {
      scheduler.cleanUpParkingLotHistory();

      const updatedRecords = await ParkingLotHistory.find({
        timestamp: {$lte: Math.floor(Date.now() / 1000)},
      }).lean();

      expect(updatedRecords).to.not.eq(undefined);
      expect(updatedRecords.length).to.greaterThan(0);
      updatedRecords.map((record) => {
        expect(record.ogImage).to.eq(undefined);
        expect(record.predImage).to.eq(undefined);
      });
    });
  });
});
