const RecentParkingLot = require('../model/RecentParkingLots');
const config = require('../config');
const BadRequestException = require('../exception/BadRequestException');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Fetches all recent parking lots from database.
 * @return {Promise<array>}
 */
exports.getAllRecentParkingLots = async () => {
    const parkingLot = await RecentParkingLot.find().lean();

    return parkingLot.map((parkingLot) => {
        return {
            latitude: parkingLot.latitude,
            longitude: parkingLot.longitude,
            parking_lot_name: parkingLot.name,
            number_of_empty_parking_slots: parkingLot.emptySpaces,
            total_number_of_parking_lots: parkingLot.totalSpaces,
            timestamp: parkingLot.timestamp,
            image_url: `${config.hostname}/parking_lots/${parkingLot._id}/image`,
            parking_lot_time_limit: parkingLot.timeLimit,
            parking_charges: parkingLot.charges,
        };
    });
};

/**
 * Fetches the original image of a parking lot using its id from database.
 * @param {String} id
 * @return {Promise<ArrayBuffer>}
 *
 * @throws BadRequestException
 */
exports.getImageByParkingLotId = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid Id. Document with id: ${id} does not exists.`);
    }

    const parkingLot = await RecentParkingLot.findById(id).lean();

    return parkingLot.ogImage.buffer;
};
