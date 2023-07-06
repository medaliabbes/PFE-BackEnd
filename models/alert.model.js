

const mongoose = require('mongoose') ;

const Alert = mongoose.Schema({
    
    deviceid : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'device',
    },


});

