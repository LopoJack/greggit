const express = require('express');
const router = express.Router();
const {Posts} = require("../models");
const {Users} = require("../models");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get('/', async (req, res) => {
    //get records from DB
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id); 
    res.json(post);
});

router.post("/", async (req, res) => {
    //create a var to hold the post request body
    const post = req.body;	//variable will have the same format as the model with fields
    await Posts.create(post);	//sequelize inserts into DB
    res.json(post);		//return the data that was inserted in DB
});

module.exports = router;