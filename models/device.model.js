
const mongoose = require('mongoose') ;

const Device = mongoose.Schema({
    mode   : String ,//0 manual , 1 automatic , 2 programing(set a moisture level threashold
    appid  : String ,//ttn
    ttnid  : {type : String , required : true ,unique : true ,maxlength:20,minlenght:20} ,
    eui    : {type : String , required : true ,unique : true ,minlength:16,maxlength:16} ,//ttn 
    join   : {type : String , required : true ,unique : true ,minlength:16,maxlength:16},//ttn
    appkey : {type : String , required : true ,minlength:32,maxlength:32},//ttn
    name   : String ,//ttn 
    zoneid : {type : mongoose.Schema.Types.ObjectId ,ref  : 'zone'},
    ownerid: {type : mongoose.Schema.Types.ObjectId ,ref  : 'user'} ,
    state  : {type : String  , default : "disconnected"}    
}) ;


module.exports = mongoose.model('device' , Device) ;