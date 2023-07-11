const parkingLotSchema = require("../model/RecentParkingLots");

exports.getAllRecentParkingLots = async () => {
    try {
        const parking_lots = await parkingLotSchema.find().lean();
        let responses = [];

        for (const index in parking_lots) {
            const parking_lot = parking_lots[index];

            responses.push({
                latitude: parking_lot.latitude,
                longitude: parking_lot.longitude,
                parking_lot_name: parking_lot.name,
                number_of_empty_parking_slots: parking_lot.emptySpaces,
                total_number_of_parking_lots: parking_lot.totalSpaces,
                timestamp: parking_lot.timestamp,
                image_url: `http://localhost:8080/parking_lots/${parking_lot._id}/image`,
                parking_lot_time_limit: parking_lot.timeLimit,
                parking_charges: parking_lot.charges
            })
        }

        return responses;
    } catch (err) {
        console.log("Error while fetching data from database. " + err);
    }
}

exports.getImageByParkingLotId = async (id) => {
    try {
        const parking_lot = await parkingLotSchema.findById(id);

        return parking_lot.ogImage;
    } catch (err) {
        console.log("Error while fetching image from database. " + err);
    }
}