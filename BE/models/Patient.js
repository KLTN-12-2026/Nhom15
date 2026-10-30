const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientCode: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    dateOfBirth: {
        type: Date
    },

    gender: {
        type: String,
        enum: ['Nam', 'Nữ', 'Khác']
    },

    phone: {
        type: String
    },

    email: {
        type: String
    },

    address: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);