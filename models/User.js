const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: false,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'Client',
        enum: ['Admin', 'Client', 'Driver', 'Vendor']
    },
    profile: {
        type: String,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1617821903/Profile/blank-profile-picture-973460_640_ewvz8s.png'
    },

}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);
