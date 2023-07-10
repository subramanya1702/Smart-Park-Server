const express = require('express');
const mongoose = require("mongoose");
const parkingLotRouter = require('./route/ParkingLotRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/parking_lots', parkingLotRouter);

mongoose.connect(
    "mongodb://127.0.0.1:27011/recent_parking_lots",
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
