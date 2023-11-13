/* 
-------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with 
    `localhost:3000/api/comments`
------------------------------------------------------------- */

/* Require modules
---------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()
const jwt = require('jwt-simple');

/* Require the db connection, and models
---------------------------------------------------------- */
const db = require('../models')

/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')

/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            // console.log(req.user)
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};


/* Routes
---------------------------------------------------------- */

// Index Route (GET) | Gets all comments for a post
router.get('/:postId', function(req,res){
    db.Comment.find({postId: req.params.postId}).sort({createdAt:-1})
        .then(comments => res.json(comments))
})

// Create Route (POST) | This route receives a POST request to
// /api/comments/ and creates a new comment document using the request body
router.post('/', authMiddleware, (req, res) => {
    // Perform any actions that require authorization
    db.Comment.create({
        ...req.body,
        // The auth middleware validated the JWT token 
        // and added the decoded payload to the req.user object
        userId: req.user.id
    })
        .then(comment => res.json(comment))
        .catch(err=>console.log(err))
})

// Update Route (PUT) | This route receives a PUT request to
// /api/comments/ and updates a specific comment using the request body
router.put('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the update request is the same user who created the comment
    const userComment = await db.Comment.findById(req.params.id)
        .catch(err=>console.log(err))
    if (userComment.userId == req.user.id) {
        // If it is the original author, update the comment
        const newComment = await db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(newComment)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// Delete Route (DELETE) | This route receives a DELETE request to
// /api/comments and deletes a specific comment using a comment ID
router.delete('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the delete request is the same user who created the comment
    const userComment = await db.Comment.findById(req.params.id)
    if (userComment.userId == req.user.id) {
        const deletedComment = await db.Comment.findByIdAndDelete(req.params.id)
        res.send('You deleted comment ' + deletedComment._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router