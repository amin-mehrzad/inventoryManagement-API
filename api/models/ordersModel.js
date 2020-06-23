const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const OrderSchema = new Schema({

    // websiteID: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Website'
    // },
    // emailUID: {
    //     type: String,
    //     trim: true,
    //  },
    // entity_id: {
    //     type: String,
    //     trim: true,
    // },
    // increment_id: {
    //     type: String,
    //     trim: true,
    // },
    // created_at: {
    //     type: String,
    //     trim: true,
    //  },
    // email: {
    //     type: String,
    //     lowercase: true
    // },
    // billingAddress: {
    //     type: Object,
    // },
    createTimeStamp: {
        type: Date,
        default: Date.now
    },
    updateTimeStamp: {
        type: Date,
        default: Date.now
    },
    // updateLog: {
    //     type: Array,
    // },
    // customer_id: {
    //     type: String
    // },
    // updated_at:{
    //     type:String
    // }
}, { strict: false });

module.exports = mongoose.model('Order', OrderSchema)