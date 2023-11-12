/* 
-------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with 
    `localhost:3000/api/groups`
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

// Index Route (GET) | Gets all groups available
router.get('/', function(req,res){
    db.Group.find().sort({createdAt:-1})
        .then(groups => res.json(groups))
})

// Create route
router.post('/', authMiddleware, (req, res) => {
    console.log(req.user)
    db.Group.create({
        ...req.body,
        creatorId:req.user.id,
        users:req.user.id
    })
        .then(post => res.json(post))
        .catch(err=>console.log(err))
})

// Add user to a group
router.put('/:id', async (req, res)=>{
    // let userId = req.params
    // console.log(req.body.id)
    const user=await db.User.findById(req.body.id)
        .then(async user=>{
            // res.json(typeof user._id)
            let userOID=user._id
            const userGroup= await db.Group.findById(req.params.id)
            // console.log(userGroup.users.find(id=>id==user.id))
            if(userGroup.users.find(id=>id==user.id)){
                res.json("User already in group")
            }
            else{
                await db.Group.findByIdAndUpdate(
                    req.params.id,
                    {
                        $push:{
                            users:userOID
                        }
                    },
                    {new:true}
                )
                    .then(group=> res.json(group))
                    .catch(err=>console.log(err))
            }
        })
        .catch(err=>res.json(err))
    // const userGroup= db.Group.findByIdAndUpdate(
    //     req.params.id,
    //     {
    //         $push:{
    //             users:userId
    //         }
    //     }
    // )
    //     .then(group=> res.json(group))
    //     .catch(err=>console.log(err))
})

/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router