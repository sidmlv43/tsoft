  
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

var userSchema = new Schema({
firstName: {
     type: String,
     required: true,
     maxlength: 32,
     trim: true
 },
 lastName: {
     type: String,
     maxlength: 32,
     trim: true
 },
 email: {
     type: String,
     trim: true,
     required: true,
     unique: true
 },
 score: {
    type: ObjectId,
    ref: "Score"
 },
 avgScore: {
     type: Number
 }
}, {timestamps: true});


module.exports = mongoose.model('User', userSchema);