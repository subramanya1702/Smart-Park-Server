const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parkingLotSchema = new Schema({
    latitude: String,
    longitude: String,
    name: String,
    emptySpaces: Number,
    totalSpaces: Number,
    timestamp: String,
    ogImageUrl: String,
    predImageUrl: String,
    timeLimit: String,
    charges: String
});

module.exports = mongoose.model("RecentParkingLots", parkingLotSchema);