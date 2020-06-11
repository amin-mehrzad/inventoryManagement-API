const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const DocumentSchema = new Schema({
    documentNumber: {
        type: Number,
        trim: true,
    },
    documentName: {
        type: String,
    },
    documentType: {
        type: String,
    },
    documentSource: {
        type: String,
    },
    documentRefrence: {
        type: String,
    },
    documentLines: [{
        lineID: {
            type: String
        },
        lineItemName: {
            type: String
        },
        lineItemID: {
            type: String
        },
        lineItemSku: {
            type: String
        },
        lineItemPrice: {
            type: Number
        },
        lineItemCost: {
            type: Number
        },
        lineItemDiscount: {
            type: Number
        },
        lineItemQty: {
            type: Number
        },
    }]
});
module.exports = mongoose.model('Document', DocumentSchema)