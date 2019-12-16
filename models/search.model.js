const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const searchSchema = new Schema({
    // searchid: { type: Number, required: false, unique: true },
    term: { type: String, required: true, trim: true },
    count: { type: Number, required: false },
    /** searchdate we can use the default timestamps searchdate: { type: Date, required: false }, */
    timetosearch: { type: Number, required: false }
}, {
    timestamps: true,
});

const Search = mongoose.model('Search', searchSchema);
module.exports = Search;
