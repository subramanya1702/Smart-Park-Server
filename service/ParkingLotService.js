const RecentParkingLot = require('../model/RecentParkingLots');
const ParKingLotHistory = require('../model/ParkingLotHistory');
const config = require('../config');
const BadRequestException = require('../exception/BadRequestException');
const imageType = require('../enum/ImageType');

/**
 * Fetches all recent parking lots from database.
 * @return {Promise<array>}
 */
exports.getAllRecentParkingLots = async () => {
    const recentParkingLots = await RecentParkingLot.find().lean();

    return recentParkingLots.map((parkingLot) => {
        return {
            id: parkingLot.id,
            latitude: parseFloat(parkingLot.latitude),
            longitude: parseFloat(parkingLot.longitude),
            parking_lot_name: parkingLot.name,
            number_of_empty_parking_spaces: parkingLot.emptySpaces,
            total_number_of_parking_spaces: parkingLot.totalSpaces,
            timestamp: timestampToFormattedDate(parkingLot.timestamp),
            original_image_url: `${config.hostname}/parking_lots/${parkingLot.id}/image?type=originalImage`,
            labelled_image_url: `${config.hostname}/parking_lots/${parkingLot.id}/image?type=labelledImage`,
            parking_lot_time_limit: parkingLot.timeLimit,
            parking_charges_in_dollars_per_hour: parkingLot.charges,
        };
    });
};

/**
 * Fetches the original image of a parking lot using its id from database.
 * @param {String} id
 * @param {String} type
 * @return {Promise<ArrayBuffer>}
 *
 * @throws BadRequestException
 */
exports.getImageByParkingLotId = async (id, type) => {
    // if (!ObjectId.isValid(id)) {
    //     throw new BadRequestException(`Invalid Id. Document with id: ${id} does not exists.`);
    // }

    let parkingLot = await RecentParkingLot.findOne({id: id}).lean();

    if (!parkingLot) {
        parkingLot = await ParKingLotHistory.findOne({id: id}).lean();

        if (!parkingLot) {
            throw new BadRequestException(`Invalid Id. Document with id: ${id} does not exists.`);
        }
    }

    switch (type) {
        case imageType.ORIGINAL_IMAGE:
            return parkingLot.ogImage.buffer;
        case imageType.LABELLED_IMAGE:
            return parkingLot.predImage.buffer;
        default:
            throw new BadRequestException(`Invalid type: ${type}`);
    }
};


/**
 * Converts the given timestamp from epoch milliseconds to YYYY-MM-DD hh-mm-ss format
 * @param {Int} timestamp
 * @return {String}
 */
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
