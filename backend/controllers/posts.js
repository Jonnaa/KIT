/* 
-------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with 
    `localhost:3000/api/posts`
------------------------------------------------------------- */

/* Require modules
---------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()

/* Require the db connection, and models
---------------------------------------------------------- */
const db = require('../models')

/* Routes
---------------------------------------------------------- */

// Index Route (GET) | Gets all posts available
router.get('/', function(req,res){
    db.Post.find().sort({createdAt:-1})
        .then(posts => res.json(posts))
})

// Create Route (POST) | This route receives a POST request to
// /api/posts/ and creates a new post document using the request body
router.post('/', (req, res) => {
    db.Post.create(req.body)
        .then(post => res.json(post))
})

// Update Route (PUT) | This route receives a PUT request to
// /api/posts/ and updates a specific post using the request body
router.put('/:id', (req, res) => {
    db.Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(post => res.json(post))
})

// Delete Route (DELETE) | This route receives a DELETE request to
// /api/posts and deletes a specific post using a post ID
router.delete('/:id', (req, res) => {
    db.Post.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedPostId: req.params.id }))
})

/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router