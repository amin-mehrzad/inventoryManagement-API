const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScopesSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    permissions: {
        type: [String],
        trim: true,
        required: true
    }
});
module.exports = mongoose.model('Scopes', ScopesSchema);