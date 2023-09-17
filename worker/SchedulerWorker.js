
/**
 * this Worker need to get data saved in redis and check if time 
 * arrive send data to devices or application 
 */

const mqtt             =  require('mqtt')    ;
const Redis            =  require("ioredis") ;
const mongoose         =  require("mongoose");
const DeviceService    = require('./../services/device.service');
const MQTTSender       = require('../utilities/mqtt.sender') ;
const redis = new Redis();

//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI ,
    {
      useNewUrlParser    : true     ,
      useUnifiedTopology : true     ,
    }
  );


//Call this function every 1 minute
setInterval(  CheckScheduler , 1000 *60 ) ;




const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] ;



async function CheckScheduler()
{
    let date = new Date() ;
    
    const redisKey = `${days[date.getDay()]}-${date.getHours()}:${date.getMinutes()}` ;

    console.log("check sch :" , redisKey) ;

    let SchedulerList = await  RedisGetListOfScheduler(redisKey) ;

    
    for(let i = 0 ;i<SchedulerList.length ; i++)
    {
        
        if(SchedulerList[i].device)
        {
            //console.log(SchedulerList[i]) ;
            await SendCommandToDevice(SchedulerList[i].device ,"on") ;
        }
        else if(SchedulerList[i].zone)
        {
            await SendCommandToZone(SchedulerList[i].zone) ;
        }
        else{

        }
    }

    /**
     * '{"dayOftheWeek":"Sun","timeOftheDay":"8:7",
     * "Duration":"00:40","device":"64d7dc22ed015d061f656f95"}'
     */
    //console.log(redisData) ;

}

async function RedisGetListOfScheduler(key)
{
    let ListOfScheduler = await  redis.lrange(key , 0 , -1) ;

    for(let i = 0 ;i<ListOfScheduler.length ;i++)
    {
        ListOfScheduler[i] = JSON.parse(ListOfScheduler[i]) ;
    }

    return ListOfScheduler ;
}


async function SendCommandToDevice(deviceid , command)
{
    const device = await DeviceService.Read(deviceid) ;
   
    if(device){
        MQTTSender.emit('command-device' , {
            appid  : device.appid  , 
            appkey : device.appkey , 
            data   : command       , 
            eui    : device.eui 
        }) ;
    }else{
        
    }
}

async function SendCommandToZone(zoneid)
{

}