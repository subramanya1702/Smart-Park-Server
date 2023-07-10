const express = require('express');
const router = express.Router();
const {
    getAllRecentParkingLots
} = require("../controller/ParkingLotController")

router.route("/").get(getAllRecentParkingLots);

module.exports = router;
