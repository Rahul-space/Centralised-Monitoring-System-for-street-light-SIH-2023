const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// Define collection and schema for Fault
let Fault=new Schema({
    macid:{
        type:String,
        required:true
    },
    zone:{
        type:Object,
        default:{}
    },
    lightsFault:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
        default:"pending"
    },
},{
    collection:'Fault'
},
{
    timestamps:true
});

module.exports = mongoose.model('Fault',Fault);

