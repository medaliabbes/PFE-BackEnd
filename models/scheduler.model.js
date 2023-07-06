
const mongoose = require('mongoose') ;


const Scheduler = mongoose.Schema(
    {
        dayOftheWeek : String ,
        timeOftheDay : String ,
        Duration     : String ,
        //the scheduler should be for a device or for group
        device       : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'device' ,
        },
        zone         : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'zone' ,
        }
    });

module.exports = mongoose.model('scheduler' , Scheduler) ;
