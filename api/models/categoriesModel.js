const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const CategorySchema = new Schema({

    CategoryName: {
        type: String,
    },
    CategoryDescription: {
        type: String,
    },
    sortOrder:{
      type:Number
    },
    websiteID: {
        type: Schema.Types.ObjectId,
        ref: 'Website'
    },

},{strict:false});
module.exports = mongoose.model('Category', CategorySchema)