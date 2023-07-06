
const mongoose = require('mongoose') ;

const Device = mongoose.Schema({
    _id  :  mongoose.Schema.Types.ObjectId,
    mode :  { 
              type : Number ,
              default : 0 
            }, //0 manual , 1 automatic , 2 programing(set a moisture level threashold)

    dev_eui  : { 
        type: String,
        required: true ,
        /*maxlength : 10 ,
        minlength : 10 */
    } , 
    
    join_eui : String ,
    
    zoneid   :{
        type :  mongoose.Schema.Types.ObjectId,
        ref  : 'zone',
    } ,
    
    ownerid   : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'user' , 
    }
}) ;


module.exports = mongoose.model('device' , Device) ;