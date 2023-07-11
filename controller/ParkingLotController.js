const parkingLotService = require("../service/ParkingLotService");
const fs = require("fs");

exports.getAllRecentParkingLots = async (req, res) => {
    try {
        const parkingLots = await parkingLotService.getAllRecentParkingLots();
        res.json({data: parkingLots});
    } catch (err) {
        console.log("Error while fetching data from parking lot service. " + err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

exports.getImageByParkingLotId = async (req, res) => {
    try {
        const imagePath = await parkingLotService.getImageByParkingLotId(req.params.id);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imagePath);
    } catch (err) {
        console.log("Error while fetching image from parking lot service. " + err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}