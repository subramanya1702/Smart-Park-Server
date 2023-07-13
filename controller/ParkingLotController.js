const parkingLotService = require('../service/ParkingLotService');
const BadRequestException = require('../exception/BadRequestException');

/**
 * Controller to fetch all recent parking lots
 * @param req
 * @param res
 *
 * @err Logs any error occurred while fetching data from database.
 * Sets the status code to 500
 */
exports.getAllRecentParkingLots = async (req, res) => {
    try {
        const parkingLots = await parkingLotService.getAllRecentParkingLots();
        res.json({data: parkingLots});
    } catch (err) {
        console.log('Error while fetching data from database.\n' + err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

/**
 * Controller to get an image of a parking lot
 * @param req
 * @param res
 *
 * @err Logs any error occurred while fetching image from database.
 * Sets the status code based on the error thrown in the service
 */
exports.getImageByParkingLotId = async (req, res) => {
    try {
        const imagePath = await parkingLotService.getImageByParkingLotId(req.params.id);
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imagePath);
    } catch (err) {
        if (err instanceof BadRequestException) {
            console.log(err.message);
            res.status(400).json({error: err.message});
        } else {
            console.log('Error while fetching image from database.\n' + err.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
};
