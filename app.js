const express = require('express');
const parkingLotRouter = require('./route/ParkingLotRoute');
const mongoose = require("mongoose");

//TODO: Add unit tests
//TODO: Do not hard code connection string and other similar stuff. Fetch from a config file
const app = express();
const url = "mongodb://127.0.0.1:27017/plv_detection_data";

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/parking_lots', parkingLotRouter);

mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    err => {
        if (err) {
            console.log("Unable to connect to MongoDB. " + err.message);
        } else {
            console.log("Connected to MongoDB");
        }
    }
);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

module.exports = app;