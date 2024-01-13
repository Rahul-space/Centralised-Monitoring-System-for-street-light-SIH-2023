const express= require("express");
const app = express();
const mongoose = require("mongoose");   //importing mongoose    
const userRoute=require("./routes/user.js");
const zoneRoute=require("./routes/zone.js");
const faultRoute=require("./routes/fault.js");
const cors = require("cors");




//make cors to allow all origins
app.use(cors({
    origin: '*' // Reminder on the day of deployment change the name to  the current domain address of the frontend
}));






mongoose
  .connect("mongodb+srv://rmdec:rmdec@sih2023.0ka057d.mongodb.net/?retryWrites=true&w=majority", {
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });



app.get("/",(req,res)=>{
    res.send("Welcome to Bass server by Rahul.R <br/><br/> Please dont use broken link . our service is fully free<br/>so you can signup and enjoy our service <br/> you can signup using below link <a href=facebook.com>hi</a>");
  })

app.use(express.json())

app.use("/api/user",userRoute);
app.use("/api/zone",zoneRoute);
app.use("/api/fault",faultRoute);
app.listen(8800, () => {
    console.log("Backend is live on http://localhost:8800");
  });



