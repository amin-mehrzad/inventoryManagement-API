const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    imageUrl: {
        type: String,
        trim: true,
    },
    name: {
        type: String,

    },
    price: {
        type: Number,

    },
    qty: {
        type: Number,
        trim: true,
    },
    tax: {
        type: String,
        trim: true,
    },
    featured: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    barcode: {
        type: String,
        trim: true,
    },
    active: {
        type: String,
        trim: true,
    },
    websiteID: {
        type: Schema.Types.ObjectId,
        ref: 'Website'
    },

},{strict:false});
module.exports = mongoose.model('Product', ProductSchema)