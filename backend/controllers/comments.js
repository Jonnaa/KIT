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

/* Require the db connection, and models
---------------------------------------------------------- */
const db = require('../models')

/* Routes
---------------------------------------------------------- */

// Index Route (GET) | Gets all comments for a post
router.get('/:postId', function(req,res){
    db.Comment.find({postID: req.params.postId})
        .then(comments => res.json(comments))
})

// Create Route (POST) | This route receives a POST request to
// /api/comments/ and creates a new comment document using the request body
router.post('/', (req, res) => {
    db.Comment.create(req.body)
        .then(comment => res.json(comment))
})

// Update Route (PUT) | This route receives a PUT request to
// /api/comments/ and updates a specific comment using the request body
router.put('/:id', (req, res) => {
    db.Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(comment => res.json(comment))
})

// Delete Route (DELETE) | This route receives a DELETE request to
// /api/comments and deletes a specific comment using a comment ID
router.delete('/:id', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json({ deletedCommentId: req.params.id }))
})

/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router