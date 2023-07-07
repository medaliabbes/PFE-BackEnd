
const mongoose = require('mongoose') ;

const User = mongoose.Schema({
    _id       : {
        type :mongoose.Schema.Types.ObjectId ,
        default : new mongoose.Types.ObjectId() ,
    } ,
    //a user can add another user by, and auth0 will do the rest
    addby : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'user' ,
            },
    email : {
        type : String ,
        required : true ,
            } ,
    name       : String ,
    profilepic : String ,
    password   : String ,
    permissionLevel : Number , //farmer , worker 
});

module.exports = mongoose.model('user' , User);