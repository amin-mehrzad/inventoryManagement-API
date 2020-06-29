const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const NotShippedOrderSchema = new Schema({
    orderNumber: {
        type: Number,
    },
    orderId: {
        type: String,
    },
    parentOrderId: {
        type: Number,
    },
    orderNumber: {
        type: String,
    },
    isSplited: {
        type: Boolean,
    },
    createTimeStamp: {
        type: Date,
        default: Date.now
    },
    updateTimeStamp: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

module.exports = mongoose.model('NotShippedOrder', NotShippedOrderSchema)