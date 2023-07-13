const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkingLotSchema = new Schema({
    latitude: String,
    longitude: String,
    name: String,
    emptySpaces: Number,
    totalSpaces: Number,
    timestamp: Number,
    ogImage: Buffer,
    timeLimit: String,
    charges: Number
});

module.exports = mongoose.model('recentParkingLots', parkingLotSchema, 'recentParkingLots');
