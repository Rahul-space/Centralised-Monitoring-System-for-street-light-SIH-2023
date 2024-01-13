const express = require('express');
const router = express.Router();
const fault = require("../models/Fault.js");
const zone = require("../models/Zone.js");
const user = require("../models/User.js");  



//Create a new fault
const faultDetails=["no fault","flickering","bulb dead","line breakage","low voltage","high voltage","unknown fault"];

//post /faultmaintanance

router.post('/register',async (req, res) => {
    const zoneDetails=await zone.findOne({mac:req.body.macid});
    zoneDetails.lights[req.body.light]={light_status:"fault",fault:faultDetails[req.body.fault]};
    const newFault = new fault({
        macid:req.body.macid,  
        zone:zoneDetails,
        lightsFault:req.body.lightsFault,
        status:"pending"
    });
    try{
        const result = await newFault.save();
        await zone.findByIdAndUpdate(zoneDetails._id,{lights:zoneDetails.lights,faults:true,faultId:result._id},{new:true});
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Close a fault
//post /faultmaintanance/close
router.post('/close',async (req, res) => {
    const faultDetails=await fault.findById(req.body.faultId);
    const zoneDetails=await zone.findOne({mac:faultDetails.macid});
    zoneDetails.lights[req.body.light]={light_status:"working",fault:"no fault"};
    try{
        const result = await fault.findByIdAndUpdate(req.body.faultId,{status:"closed"},{new:true});
        await zone.findByIdAndUpdate(zoneDetails._id,{lights:zoneDetails.lights,faults:false,faultId:""},{new:true});
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;


