
const mongoose = require('mongoose') ;

const User = mongoose.Schema({
    _id       : mongoose.Schema.Types.ObjectId ,
    //a user can add another user by, and auth0 will do the rest
    addby : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user' ,
        default : 'null'
            },
    email : {
        type : String ,
        required : true ,
            } ,
    name       : String ,
    profilePic : String ,
    passWord   : String ,
    permissionLevel : Number , //farmer , worker 
});

module.exports = mongoose.model('user' , User);