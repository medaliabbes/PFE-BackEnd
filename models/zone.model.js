
const mongoose = require('mongoose') ;


const Zone = mongoose.Schema({
    _id       : mongoose.Schema.Types.ObjectId ,
    name     : String ,
    location : String ,
});


module.exports = mongoose.model('zone' , Zone) ;