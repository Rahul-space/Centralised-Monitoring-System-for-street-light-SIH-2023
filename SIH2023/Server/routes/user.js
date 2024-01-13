const express = require('express');
const router = express.Router();
const user =require("../models/User.js");

// POST /user/register
router.use(express.json());
router.post('/register',async (req, res) => {
    const newUser = new user(req.body);
    const pre=await user.findOne({email:req.body.email});
    try{
        if(pre){
            res.status(302).json({message:"User already exists"});
        }else{
            const result = await newUser.save();
            res.status(201).json(result);
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//get all users
router.get('/all',async (req, res) => {
    try{
        const pre=await user.find();
        res.status(200).json(pre);
    }catch(err){
        console.log(err);
        res.status(500).json(err.message);
    }
});


// login
router.post('/login',async (req, res) => {
    try{
        const pre=await user.findOne({email:req.body.email});
        if(pre){
            if(pre.password==req.body.password){
                res.status(200).json(pre);
            }else{
                res.status(401).json({message:"Wrong password"});
            }
        }else{
            res.status(404).json({message:"User not found"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err.message);
    }
});
router.get('/all',async (req, res) => {
    try{
        const pre=await user.find();
        res.status(200).json(pre);
    }catch(err){
        console.log(err);
        res.status(500).json(err.message);
    }
});

router.post('/connection/:mac/:arr', async (req, res) => {
    const mac = req.params.mac; // Access the 'message' parameter from the URL
    var arr = req.params.arr.split('.');
    console.log("Connection Established", mac , "array",req.params.arr);
    res.status(200).json("verified");
  });


module.exports = router;
