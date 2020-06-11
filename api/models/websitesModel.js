const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const WebsiteSchema = new Schema({
  websiteID: {
    type: String,
    trim: true,
    // required: true,
  },
  websiteName: {
    type: String,
    trim: true,
    //   required: true,
  },
  businessLogoUrl: {
    type: String,
    trim: true,
},
  websitePlatform: {
    type: String,
    trim: true,
  },
  websiteEmail: {
    type: String,
    trim: true,
  },
  websiteFromEmail: {
    type: String,
    trim: true,
    //  required: true,
  },
  phone: {
    type: Number,

  },
  state: {
    type: String,
  },
  country: {
    type: String,
    trim: true,
    //   required: true,
  },
  scopeID: {
    type: Schema.Types.ObjectId,
    ref: 'Scopes'
  },
  businessEmail: {
    type: String,
    trim: true,
    //   required: true
  },
  businessAddress: {
    type: String,
   // trim: true
  },
  businessPhone: {
    type: Number,
    trim: true
  },
  businessName: {
    type: String,
    //trim: true
  }
});
module.exports = mongoose.model('Website', WebsiteSchema)