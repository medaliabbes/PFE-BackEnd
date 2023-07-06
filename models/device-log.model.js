

const mongoose = require('mongoose') ;

const deviceLog = mongoose.Schema({
    deviceid : {
        type : mongoose.Schema.Types.ObjectId  ,
        ref : 'device' ,
    },
    deviceData : String ,
}) ;

module.exports = mongoose.model('deviceLog' , deviceLog) ;