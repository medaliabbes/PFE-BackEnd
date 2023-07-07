

const mongoose = require('mongoose') ;

const Alert = mongoose.Schema({
    
    _id : {
        type : mongoose.Schema.Types.ObjectId ,
        default : new mongoose.Types.ObjectId() ,
    },
    deviceid : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'device',
    },
    
});


module.exports =  mongoose.model('alert' , alert) ;

