const mongoose = require("mongoose");

const trendSchema = mongoose.Schema({
    name: String,
    number: Number,
    });

const Trend = mongoose.model('trends', trendSchema);

module.exports = Trend;