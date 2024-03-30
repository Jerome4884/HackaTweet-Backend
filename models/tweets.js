const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
    content: String,
    date: { type: Date, default: Date.now },
    trend: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trends' }],
    });

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;