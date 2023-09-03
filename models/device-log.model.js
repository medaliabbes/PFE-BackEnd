

const mongoose = require('mongoose') ;

const deviceLog = mongoose.Schema({
    timestamp: { type : Date , required : true , default : Date.now },
    deviceid : { type : mongoose.Schema.Types.ObjectId ,ref : 'device' },//id in my platform
    sensor   : String ,
    value    : Number ,
}) ;

module.exports = mongoose.model('deviceLog' , deviceLog) ;