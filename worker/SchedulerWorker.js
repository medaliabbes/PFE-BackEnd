
/**
 * this Worker need to get data saved in redis and check if time 
 * arrive send data to devices or application 
 */

const mqtt             =  require('mqtt')    ;
const Redis            =  require("ioredis") ;
const mongoose         =  require("mongoose");
const DeviceService    =  require('./../services/device.service');
const MQTTSender       =  require('../utilities/mqtt.sender') ;
const redis            =  new Redis();

//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI ,
    {
      useNewUrlParser    : true     ,
      useUnifiedTopology : true     ,
    }
  );


/***
 * 
 * add another function to turn of devices 
 * it can be periodic 
 */

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
            //send on command to the device 
            await SendCommandToDevice(SchedulerList[i].device ,"on") ;

            //calculate the off time 
            let hm = SchedulerList[i].Duration.split(':') ;

            let date = new Date() ;

            let offTime = new Date(date.getTime() + ( parseInt(hm[0]) * 60 

            + parseInt(hm[1])) * 60000) ;

            //console.log(offTime) ;

            const deviceTimeOff = "off-" +days[offTime.getDay()] + '-' 
                        + offTime.getHours() + ':' + offTime.getMinutes() ;

            console.log("TimeOff :" ,deviceTimeOff) ;
            //add the device to redis to later turn it off  
            await redis.rpush(deviceTimeOff ,JSON.stringify( SchedulerList[i]) ) ;
        }
        else if(SchedulerList[i].zone)
        {
            await SendCommandToZone(SchedulerList[i].zone) ;
        }
        else{

        }
    }

    console.log('check sch :', "off-" + redisKey) ;
    //check the devices that need to be turned off 
    let OffSchedulers = await  RedisGetListOfScheduler("off-" + redisKey) ;

    for(let i = 0 ; i < OffSchedulers.length ; i++)
    {
        console.log("Turn Off : " , OffSchedulers[i].device) ;
        
        await SendCommandToDevice(OffSchedulers[i].device , "Off") ;

                       
    }

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
        console.log("MQTT send") ;
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
    /**
     * this function should get the list of devices of and send
     * command to the device one by one 
     */
}