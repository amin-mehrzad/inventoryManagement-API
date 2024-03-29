const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    productQty:{
         type: Number,
    },
    // productImage: {
    //     type: String,
    //     trim: true,
    // },
    // productURL: {
    //     type:String
    // },
    // productName: {
    //     type: String,
    // },
    // productPrice: {
    //     type: Number,
    // },
    productQty: {
        type: Number,
    },
    productAvailableQty: {
        type: Number,
    },
    // productInStock: {
    //     type: String,
    // },

    // productSalableQty: {
    //     type: Number,
    //     trim: true,
    // },
    // productCategory: {
    //     type: String,
    //     trim: true,
    // },
    // productID: {
    //     type: Number,
    //     trim: true,
    // },
    // productSKU: {
    //     type: String,
    //     trim: true,
    // },
    // productStatus: {
    //     type: String,
    // },
    // productMSRP:{
    //     type: Number,
    // },
    // productMSWP:{
    //     type: Number,
    // },
    // websiteID: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Website'
    // },
    updateTimeStamp:{
        type: Date,
        default: Date.now
        }
},{strict:false});
module.exports = mongoose.model('Product', ProductSchema)