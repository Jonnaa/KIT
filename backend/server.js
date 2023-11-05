/* Require modules
---------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')


/* Require the db connection, models, and seed data
---------------------------------------------------------- */
const db = require('./models');


/* Create the Express app
---------------------------------------------------------- */
const app = express();

/* Tell the app to listen on the specified port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});