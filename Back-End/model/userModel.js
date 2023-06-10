const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
}, {timestamps: true});

module.exports = mongoose.model('user', UserSchema);