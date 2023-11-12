/* Require modules
---------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')


/* Require the db connection, models, and seed data
---------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const commentsCtrl = require('./controllers/comments')
const postsCtrl = require('./controllers/posts')
const usersCtrl = require('./controllers/users')
const groupsCtrl = require('./controllers/groups')

/* Create the Express app
---------------------------------------------------------- */
const app = express();


/* Middleware (app.use)
---------------------------------------------------------- */
// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


/* Mount routes
---------------------------------------------------------- */
// This tells the app to look at the `controllers/comments.js` file 
// to handle all routes that begin with `localhost:3000/api/comments`
app.use('/api/comments', commentsCtrl)

// This tells the app to look at the `controllers/posts.js` file 
// to handle all routes that begin with `localhost:3000/api/posts`
app.use('/api/posts', postsCtrl)

// This tells the app to look at the `controllers/users.js` file 
// to handle all routes that begin with `localhost:3000/api/users`
app.use('/api/users', usersCtrl)

// This tells the app to look at the `controllers/groups.js` file 
// to handle all routes that begin with `localhost:3000/api/groups`
app.use('/api/groups', groupsCtrl)

/* Tell the app to listen on the specified port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});