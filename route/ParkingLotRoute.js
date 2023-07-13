const express = require('express');
const router = express.Router();
const {
    getAllRecentParkingLots,
    getImageByParkingLotId
} = require('../controller/ParkingLotController');

router.route('/').get(getAllRecentParkingLots);
router.route('/:id/image').get(getImageByParkingLotId);

module.exports = router;
