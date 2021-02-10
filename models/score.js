var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

var scoreSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    firstRound: {
        type: Number,
        required: true
    },
    secondRound: {
        type: Number,
        required: true
    },
    thirdRound: {
        type: Number,
        required: true
    },
    avgScore: {
        type: Number,
    }
})


module.exports = mongoose.model('Score', scoreSchema);