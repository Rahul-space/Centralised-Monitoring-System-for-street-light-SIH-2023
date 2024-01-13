const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZoneSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    zone: {
        type: Number,
        required: true
    },
    mac:{
        type:String,
        required:true
    },
    location: {
        type: String,
        required: true
    },cordinates:{
        type: Object,
        required: true
    
    },
    lights:{
        type:Array,
        default:[]
    },
    lineman:{
        type:Array,
        default:[]
    },
    faults:{
        type:Boolean,
        default:false
    },
    faultcount:{
        type:Number,
        default:0
    }
    }, {timestamps: true});   

    module.exports = mongoose.model('Zone', ZoneSchema);