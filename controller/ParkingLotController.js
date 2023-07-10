const parkingLotService = require("../service/ParkingLotService")

exports.getAllRecentParkingLots = async (req, res) => {
    try {
        const parkingLots = await parkingLotService.getAllRecentParkingLots();
        res.json({data: parkingLots, status: "success"});
    } catch (err) {
        console.log("Error while fetching data from database. " + err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}