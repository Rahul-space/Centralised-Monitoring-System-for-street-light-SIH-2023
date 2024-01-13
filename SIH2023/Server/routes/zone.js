const express = require('express');
const router = express.Router();
const zone = require("../models/Zone.js");
const user = require("../models/User.js");

const accountSid = 'AC24ecde671511039f551a32690cdeef3b';
const authToken = '46be0b7f5a5cd492a57aafc7a6f42a28';
const twilioPhoneNumber = '+17653144295';

const client = require('twilio')(accountSid, authToken);

function sendSMS(to, message) {
  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: to
    })
    .then(message => console.log(`SMS sent: ${message.sid}`))
    .catch(error => console.error(error));
}

// Example usage

// POST /Zone/register
router.post('/register',async (req, res) => {
    const newZone = new zone(req.body);
    const linemans=await user.find({zone:req.body.zone,role:"lineman"});
    newZone.lineman=linemans;
    try{
        const result = await newZone.save();
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});






const faultDetails=["no fault","flickering","bulb dead","line breakage","low voltage","high voltage","unknown fault"];

// add faults
router.post('/fault/register',async (req, res) => {
    const zoneDetails=await zone.findOne({mac:req.body.macid});
    zoneDetails.lights[req.body.light]={light_status:"fault",fault:faultDetails[req.body.fault]};
    let fc=0;
    for(var i=0;i<zoneDetails.lights.length;i++){
        if(zoneDetails.lights[i].light_status=="fault"){
            fc++;
        }
    }
    try{
        const result = await zone.findByIdAndUpdate(zoneDetails._id,{lights:zoneDetails.lights,faults:true,faultcount:fc},{new:true});
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});



//Get all Zones with status faults true
router.get('/faults',async (req, res) => {
    try{
        const result = await zone.find({faults:true});
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
// zones with no faults
router.get('/noFaults',async (req, res) => {
    try{
        const result = await zone.find({faults:false});
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//zones get all 
router.get('/all',async (req, res) => {
    try{
        const result = await zone.find();
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

//Zone all lights are working properly

router.post('/allworking',async (req, res) => {
    const zoneDetails=await zone.findOne({mac:req.body.macid});
    if(zoneDetails.faults==true){
        var light_arr=zoneDetails.lights;
        for(var i=0;i<light_arr.length;i++){
            light_arr[i].light_status="working";
            light_arr[i].fault="null";
        }
        try{
            const result = await zone.findByIdAndUpdate(zoneDetails._id,{lights:light_arr,faults:false,faultcount:0},{new:true});
            res.status(201).json(result);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }else{
        res.status(500).json("no faults");
    }

});





router.post('/connection/:zone/:light/:status', async (req, res) => {
    const zoneDetails=await zone.findOne({mac:req.params.zone});
    const preFault=zoneDetails.faults;
    const mac = req.params.zone; // Access the 'message' parameter from the URL
    const lightno = req.params.light;
    const lat=zoneDetails.cordinates.lattitude;
    const longitude=zoneDetails.cordinates.longitude;
    const status=req.params.status;
    var flag=0;
    if(status==2){
        zoneDetails.lights[lightno].light_status="working";
        zoneDetails.lights[lightno].fault="null";
        flag=0;
    }else  if(status==1){
        zoneDetails.lights[lightno].light_status="fault";
        zoneDetails.lights[lightno].fault="flickering";
        flag=1;
    }else if(status==0 || status==10){
        zoneDetails.lights[lightno].light_status="fault";
        zoneDetails.lights[lightno].fault="bulb dead";
    }
    zoneDetails.faults=false;
    zoneDetails.faultcount=0;
    for(var i=0;i<zoneDetails.lights.length;i++){
        if(zoneDetails.lights[i].light_status=="fault"){
            zoneDetails.faults=true;
            zoneDetails.faultcount++;
            flag=1
        }
    }
    try{
        const result = await zone.findByIdAndUpdate(zoneDetails._id,{lights:zoneDetails.lights,faults:zoneDetails.faults,faultcount:zoneDetails.faultcount},{new:true});
        if(flag==1 && preFault==false){
            for(let i=0;i<zoneDetails.lineman.length;i++){
            sendSMS(zoneDetails.lineman[i].phone, "Street Light Fault Detected in "+zoneDetails.name+". Fault details: "+zoneDetails.lights[lightno].fault+",Location: "+lightno+" "+zoneDetails.location+"\n maps: https://www.google.com/maps?q="+lat+","+longitude);
            }
        }
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    console.log("Connection Established", mac , req.params.light , status);
    // sendSMS(zoneDetails.lineman.phone, "Street Light Fault Detected in "+zoneDetails.name+". Fault details: "+zoneDetails.lights[lightno].fault+",Location: "+lightno+" "+zoneDetails.location+" maps: https://www.google.com/maps?q="+lat+","+longitude);
  });
 




module.exports = router;
