

const mongoose = require('mongoose') ;

const Alert = mongoose.Schema({
    
    /*_id : {
        type : mongoose.Schema.Types.ObjectId ,
        default : new mongoose.Types.ObjectId() ,
    },*/
    userid   : { type : mongoose.Schema.Types.ObjectId , ref : 'user'}  ,//user how set the alert
    deviceid : { type : mongoose.Schema.Types.ObjectId , ref : 'device'},
    sensor : String ,
    threshold : Number ,
    
});


module.exports =  mongoose.model('alert' , Alert) ;

