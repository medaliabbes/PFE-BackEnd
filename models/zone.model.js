
const mongoose = require('mongoose') ;


const Zone = mongoose.Schema({
   
    userid   : {   //the id of the owner
                    type : mongoose.Schema.Types.ObjectId  ,
                    ref  : 'user'   ,
                    required : true ,
                },
    name     : String ,
    location : String ,
    ttnid    : String //Zone idin ttn network 
});


module.exports = mongoose.model('zone' , Zone) ;


