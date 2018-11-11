const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true},
    givenName: {type: String, required: true},
    familyName: {type: String, required: true},
},{
    timestamps: true
});


// Export the model
module.exports = mongoose.model('User', UserSchema);