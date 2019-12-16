const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
    url: { type: String, required: false, trim: true, default: "https://www.apple.com"},
    title: { type: String, required: false, trim: true, default: "Default Title"},
    description: { type: String, required: false, trim: true, default: "Default Description"},
    lastModified: String,
    lastIndexed: String,
    timeToIndex: String,
    wordname: { type: String, required: false, trim: true, default: "aimee"},
    freq: { type: Number, required: false, default: 6},

}, {
    timestamps: true,
});

// pageSchema.index({ wordname: 'text' });

module.exports = mongoose.model("Page", PageSchema);

// const Page = mongoose.model('Page', pageSchema);
// module.exports = Page;