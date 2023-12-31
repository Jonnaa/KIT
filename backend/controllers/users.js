/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/api/users`
-------------------------------------------------------------------------------------*/

/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple')
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection and models
--------------------------------------------------------------- */
const db = require('../models')


/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')


/* Routes
--------------------------------------------------------------- */
// SIGN UP ROUTE (create user)
router.post('/signup', (req, res) => {
    // Create a new user
    db.User.create(req.body)
        .then(user => {
            // if the database creates a user successfully, assign a JWT to the user and send the JWT as the response
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token, name:user.name })
        })
        // send an error if the database fails to create a user
        .catch(() => {
            res.json({ data: 'Could not create a new user, try again' })
        })
})

// LOG IN (log into a user account)
router.post('/login', async (req, res) => {
    // attempt to find the user by their email in the database
    const foundUser = await db.User.findOne({ username: req.body.username })
        
    // make sure the user was found and the entered password is the
    // same as the user password
    if (foundUser && foundUser.password === req.body.password) {
        // if the above applies, send the JWT to the browser
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            username: foundUser.username,
            name:foundUser.name,
        })
        // if the user was not found in the database OR their password was incorrect, send an error
    } else {
        res.sendStatus(401)
    }
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router