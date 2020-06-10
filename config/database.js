//Set up mongoose connection
require('dotenv').config();
const dbAddress = process.env.DB_ADDRESS;
const mongoose = require('mongoose');
const mongoDB = dbAddress;
mongoose.connect(mongoDB,{useUnifiedTopology: true , useNewUrlParser: true});
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
module.exports = mongoose;