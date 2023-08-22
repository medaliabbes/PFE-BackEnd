

const mongoose = require('mongoose') ;

const deviceLog = mongoose.Schema({
    deviceid : { type : mongoose.Schema.Types.ObjectId ,ref : 'device' },
    sensor   : String ,
    value    : Number ,
}) ;

module.exports = mongoose.model('deviceLog' , deviceLog) ;