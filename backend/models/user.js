const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        minlength: 6,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
	email: { 
        type: String,
        unique: true,
        required: true
    },
	password: { 
        type: String, 
        minlength: 6,
        required: true,
    }
})

module.exports = mongoose.model('User', UserSchema)