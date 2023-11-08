// Require the Mongoose package
const mongoose = require('mongoose');

// Create comment schema
const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        img: { type:String, required: true },
        description: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// Export the schema as a mongoose model
// Model will be exported to the app by index.js
module.exports = mongoose.model('Post', postSchema);