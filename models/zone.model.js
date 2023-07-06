
const mongoose = require('mongoose') ;


const Zone = mongoose.Schema({
    _id      : mongoose.Schema.Types.ObjectId ,
    userid   : {   //the id of the owner
                    type : mongoose.Schema.Types.ObjectId  ,
                    ref  : 'user' ,
                },
    name     : String ,
    location : String ,
});


module.exports = mongoose.model('zone' , Zone) ;