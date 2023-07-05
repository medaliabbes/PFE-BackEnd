
const mongoose = require('mongoose') ;

const Device = mongoose.Schema({
    _id :  mongoose.Schema.Types.ObjectId,
    dev_eui  : { 
        type: String,
        required: true ,
        /*maxlength : 10 ,
        minlength : 10 */
    } , 
    join_eui : String ,
})