// Require the Mongoose package & your environment configuration
require('dotenv').config()
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

// Console log a string indicating connection to db successful
db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// Export models to `server.js`
module.exports = {
    Comment: require('./comment'),
    Post: require('./post'),
    User: require('./user')
}