const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define collection and schema for User
let User=new Schema({
    username:{
        type:String ,
        requierd:true
    },
    email:{
        type:String,
        requierd:true,
        unique:true
    },
    password:{
        type:String,
        requierd:true
    },
    role:{
        type:String,
        requierd:true
    },
    phone:{
        type:String,
        default:"1122334455"
    },
    zone:{
        type:String,
        default:null    
    }
},{
    collection:'User'
},
{
    timestamps:true
});

module.exports=mongoose.model('User',User);

