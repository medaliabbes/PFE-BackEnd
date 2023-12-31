const mongoose = require('mongoose') ;



const UserCommand = new  mongoose.Schema({
    timestamp: { type : Date , required : true , default : Date.now },
    userid   : { type : mongoose.Schema.Types.ObjectId , ref : 'user' , required : true },
    zoneid   : { type : mongoose.Schema.Types.ObjectId , ref : 'zone' },
    deviceid : { type : mongoose.Schema.Types.ObjectId , ref : 'device' },
    command  : { type : String , require : true },
}) ;


module.exports = mongoose.model('usercommand' , UserCommand);