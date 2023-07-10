const parkingLotModel = require("../model/RecentParkingLots");

exports.getAllRecentParkingLots = async () => {
    return parkingLotModel.find();
}