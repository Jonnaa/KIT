// Require the Mongoose package
const mongoose = require('mongoose');

// Create group schema
const groupSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }],
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post',
        }],
    }
)

// Export the schema as a mongoose model
// Model will be exported to the app by index.js
module.exports = mongoose.model('Group', groupSchema);