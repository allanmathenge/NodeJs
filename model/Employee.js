const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: stringify,
        required: true
    },
    lastname: {
        type: stringify,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);