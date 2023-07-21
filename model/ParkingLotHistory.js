const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingLotHistorySchema = new Schema({
  latitude: String,
  longitude: String,
  name: String,
  emptySpaces: Number,
  totalSpaces: Number,
  timestamp: Number,
  ogImage: Buffer,
  predImage: Buffer,
  timeLimit: String,
  charges: Number,
});

module.exports = mongoose.model('parkingLotHistory', parkingLotHistorySchema, 'parkingLotHistory');
