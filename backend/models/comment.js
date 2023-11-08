// Require the Mongoose package
const mongoose = require('mongoose');

// Create comment schema
const commentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        content: { type: String, required: true },
        postId: { type: String, required: true },
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
module.exports = mongoose.model('Comment', commentSchema);