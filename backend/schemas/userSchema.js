const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    categories: [String],
});

module.exports = usersSchema;