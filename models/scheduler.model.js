
const mongoose = require('mongoose') ;


const Scheduler = mongoose.Schema(
    {
        dayOftheWeek : { type : String , required : true } ,
        timeOftheDay : { type : String , required : true } ,
        Duration     : { type : String , required : true } ,
        //the scheduler should be for a device or for zone
        device  : { type : mongoose.Schema.Types.ObjectId , ref : 'device'},
        zone    : { type : mongoose.Schema.Types.ObjectId , ref : 'zone'  },
        
    });

module.exports = mongoose.model('scheduler' , Scheduler) ;
