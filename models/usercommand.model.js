const mongoose = require('mongoose') ;



const UserCommand = new  mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId ,
        default : new mongoose.Types.ObjectId() ,
    } ,
    userid   : {   //the id of the owner
        type : mongoose.Schema.Types.ObjectId  ,
        ref  : 'user'   ,
        required : true ,
    },
    zoneid : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'zone'
    },
    deviceid : {
        type : mongoose.Schema.Types.ObjectId  ,
        ref : 'device' ,
    },
    command : {
        type : String ,
        require : true ,
    },


}) 


module.exports = mongoose.model('usercommand' , UserCommand);