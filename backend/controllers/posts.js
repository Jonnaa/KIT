/* 
-------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with 
    `localhost:3000/api/posts`
------------------------------------------------------------- */

/* Require modules
---------------------------------------------------------- */
const jwt = require('jwt-simple');
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()

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
            console.log(req.user)
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

// Index Route (GET) | Gets all posts available
router.get('/', function(req,res){
    db.Post.find().sort({createdAt:-1})
        .then(posts => res.json(posts))
})

// Create Route (POST) | This route receives a POST request to
// /api/posts/ and creates a new post document using the request body
// router.post('/', (req, res) => {
//     db.Post.create(req.body)
//         .then(post => res.json(post))
//         .catch(err=>console.log(err))
// })
router.post('/', authMiddleware, (req, res) => {
    db.Post.create({
        ...req.body,
        userId:req.user.id
    })
        .then(post => res.json(post))
        .catch(err=>console.log(err))
})

// Update Route (PUT) | This route receives a PUT request to
// /api/posts/ and updates a specific post using the request body
router.put('/:id', authMiddleware, async (req, res) => {
    const userPost = await db.Post.findById(req.params.id)
    if(userPost.userId == req.user.id){
        db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(post => res.json(post))
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// Delete Route (DELETE) | This route receives a DELETE request to
// /api/posts and deletes a specific post using a post ID
// router.delete('/:id', (req, res) => {
//     db.Post.findByIdAndDelete(req.params.id)
//         .then(() => res.json({ deletedPostId: req.params.id }))
// })
router.delete('/:id', authMiddleware, async (req, res) => {
    const userPost = await db.Post.findById(req.params.id)
    if(userPost.userId == req.user.id){
        db.Post.findByIdAndDelete(req.params.id)
            .then(() => res.json({ deletedPostId: req.params.id }))
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router