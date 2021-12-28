const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    fullname : {
        type: String,
        unique: true,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    number : {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Client', clientSchema);