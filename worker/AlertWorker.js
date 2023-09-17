

/**
 * this worker need to subscribe to all applications topic , process and store 
 * data comming from reqistred devices ,
 * 
 */

const { workerData, 
        parentPort, 
        isMainThread }  
                       = require("worker_threads");
const mqtt             = require('mqtt')   ;
const Redis            = require("ioredis");
const mongoose         = require("mongoose") ;
const DeviceLogService = require('./../services/deviceLog.service') ;
const DeviceService    = require('./../services/device.service');

//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI ,
    {
      useNewUrlParser    : true     ,
      useUnifiedTopology : true     ,
    }
  );

const redis = new Redis();

//const LoRaMessageFormatter = require('./utilities/loramessageformater') ;

console.log(workerData ) ;

var ApplicationId  = workerData.app_id  ; 
var ApplicationKey = workerData.app_key ;
var ApplicationNum = workerData.app_num ;

// connection option
const options = {
    clean   : true, // retain session
    connectTimeout: 4000   , // Timeout period
    clientId: 'AlertWorker' + ApplicationNum,
    username: ApplicationId     , // application ttnId
    password: ApplicationKey    , //application key
}


const connectUrl      = "mqtt://broker.hivemq.com:1883" ;//'mqtts://eu1.cloud.thethings.network:8883';
const MqttClient      = mqtt.connect(connectUrl, options);

console.log("Alert workerr");
MqttClient.on('connect' , (error) => {

    //subscribe to all application 
    
    //client.subscribe('#') ;
    MqttClient.subscribe("/"+ApplicationId) ;
});

MqttClient.on('message' ,async (topic, message) => {
    
    console.log("topic :" , topic) ;

    message = JSON.parse(message) ;

    try{

        const deviceEUI = message.end_device_ids.dev_eui ;

        console.log("dev eui :" , deviceEUI) ;

        console.log("dev payload :" , message.uplink_message.frm_payload) ;

        //format Payload and inserted into database 

        const device = await DeviceService.GetDeviceByTTNid(deviceEUI);

        //console.log("device:" ,device) ;

        const log = { deviceid  : device._id.toString() , sensor : "temperature" , value : 20 };

        console.log("device log :" , log);

        const dblog = await DeviceLogService.Create(log) ;

        console.log("db log :" , dblog);

        //this will return a list of alerts
        let alerts = await RedisGetDeviceAlerts(deviceEUI) ;

        console.log("alerts : " , alerts.length ) ;

        for(let i = 0 ;i<alerts.length ; i++)
        {
            let alert = JSON.parse(alerts[i]) ;
            
            //console.log("alert : " , alert ) ;

            /**
             * Here you should do the comparison between the recieved value and the alert
             * value and notify the user if the threshold is passed 
             * Firebase code can be added here
             */

        }
        


        /**
          {
            "end_device_ids" : {
                "dev_eui" :    
            } ,
            "uplink_message" : {
                "frm_payload" :
              }   
            }
          }
         */

          // Get data sent by device and compare it with redis data

    }
    catch(err)
    {
        console.log("error") ;
    }

});



async function RedisGetDeviceAlerts(DevEUI)
{
    return await redis.lrange(DevEUI , 0 , -1) ;
}


/*
setInterval(()=>{
    console.log("worker");
    parentPort.postMessage("callback" ) ;
} , 1000) ;
*/

