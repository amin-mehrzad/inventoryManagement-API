const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase:true
    }
});
module.exports = mongoose.model('Customer', CustomerSchema)