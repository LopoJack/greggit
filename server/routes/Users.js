const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware');

//route for registration
router.post("/", async (req, res) => {
    const {username, password} = req.body

    bcrypt.hash(password, 10).then((hash) => {  //get the password, hash it and return the hash
        Users.create({
            username: username,                 //create the username and hash(instead of the actual string password)
            password: hash,
        });
        res.json("SUCCESS");	//for testing
    });
});

//route for login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({where : {username: username}});   //username

    if(!user){
       res.json({error: "User doesn't exist"});    //does the username exist
    }
    else{
        bcrypt.compare(password, user.password).then((match) => {
            if(!match){
                res.json({error: "Incorrect username and/or password"});     //does the password match
            }
            else{
                const accessToken = sign({username: user.username, id: user.id}, "X7B78W94jySYsPg6");
                res.json({token: accessToken, username: username, id: user.id});
            } 
        });
    } 
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;