const express = require('express');
const mongoose = require("mongoose");
const parkingLotRouter = require('./route/ParkingLotRoute');
const config = require("./config");

const app = express();
const url = config.mongo.connection_string;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/parking_lots', parkingLotRouter);

/**
 * Connects to mongo database.
 * Logs any connection errors.
 */
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