const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: String,
    username: String,
    password: String,
    token: String,
    imageURL: String,
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweets' }],

    });

const User = mongoose.model('users', userSchema);

module.exports = User;