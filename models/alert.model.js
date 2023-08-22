

const mongoose = require('mongoose') ;

const Alert = mongoose.Schema({

    userid    : { type : mongoose.Schema.Types.ObjectId , ref : 'user'  },//user how set the alert
    deviceid  : { type : mongoose.Schema.Types.ObjectId , ref : 'device'},
    sensor    : String ,
    threshold : Number ,
    
});


module.exports =  mongoose.model('alert' , Alert) ;

