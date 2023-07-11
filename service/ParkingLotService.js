const parkingLotSchema = require("../model/RecentParkingLots");
const config = require("../config");
const BadRequestException = require("../exception/BadRequestException");
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * Fetches all recent parking lots from database.
 * @returns {Promise<array>}
 */
exports.getAllRecentParkingLots = async () => {
    const parking_lots = await parkingLotSchema.find().lean();

    return parking_lots.map((parking_lot) => {
        return {
            latitude: parking_lot.latitude,
            longitude: parking_lot.longitude,
            parking_lot_name: parking_lot.name,
            number_of_empty_parking_slots: parking_lot.emptySpaces,
            total_number_of_parking_lots: parking_lot.totalSpaces,
            timestamp: parking_lot.timestamp,
            image_url: `${config.hostname}/parking_lots/${parking_lot._id}/image`,
            parking_lot_time_limit: parking_lot.timeLimit,
            parking_charges: parking_lot.charges
        };
    });
}

/**
 * Fetches the original image of a parking lot using its id from database.
 * @param id
 * @returns {Promise<Buffer>}
 *
 * @throws BadRequestException
 */
exports.getImageByParkingLotId = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new BadRequestException(`Invalid Id. Document with id: ${id} does not exists.`);
    }

    const parking_lot = await parkingLotSchema.findById(id).lean();

    return parking_lot.ogImage.buffer;
}