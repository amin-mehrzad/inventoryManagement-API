const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    transactionNumber: {
        type: Number,
        trim: true,
    },
    transactionProductNumber: {
        type: Number,
    },
    transactionProductQty: {
        type: Number,
    },
    transactionName: {
        type: String,
    },
    transactionStatus: {
        type: String,
    }

});
module.exports = mongoose.model('Transaction', TransactionSchema)