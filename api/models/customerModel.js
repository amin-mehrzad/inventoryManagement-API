const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const CategorySchema = new Schema({

    customerFirstname: {
        type: String,
    },
    customerLastname: {
        type: String,
    },
    customerAddress: {
        type: String,
    },
    customerEmail:{
      type: String,
      lowercase: true 
    },

    // customer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Website'
    // },

},{strict:false});
module.exports = mongoose.model('Category', CategorySchema)