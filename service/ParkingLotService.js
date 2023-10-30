const RecentParkingLot = require('../model/RecentParkingLots');
const config = require('../config');
const BadRequestException = require('../exception/BadRequestException');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Fetches all recent parking lots from database.
 * @return {Promise<array>}
 */
exports.getAllRecentParkingLots = async () => {
    const recentParkingLots = await RecentParkingLot.find().lean();

    return recentParkingLots.map((parkingLot) => {
        return {
            id: parkingLot._id,
            latitude: parseFloat(parkingLot.latitude),
            longitude: parseFloat(parkingLot.longitude),
            parking_lot_name: parkingLot.name,
            number_of_empty_parking_spaces: parkingLot.emptySpaces,
            total_number_of_parking_spaces: parkingLot.totalSpaces,
            timestamp: timestampToFormattedDate(parkingLot.timestamp),
            image_url: `${config.hostname}/parking_lots/${parkingLot._id}/image`,
            parking_lot_time_limit: parkingLot.timeLimit,
            parking_charges_in_dollars_per_hour: parkingLot.charges,
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


function timestampToFormattedDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
