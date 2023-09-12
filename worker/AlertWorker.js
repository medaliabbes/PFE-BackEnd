

/**
 * this worker need to subscribe to all applications topic , process and store 
 * data comming from reqistred devices ,
 * 
 */

const { workerData, 
        parentPort, 
        isMainThread }  
                = require("worker_threads");
const mqtt      = require('mqtt') ;
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

MqttClient.on('message' , (topic, message) => {
    
    console.log("topic :" , topic) ;

    //console.log("message :" , message) ;
    
    message = JSON.parse(message) ;

    try{

        console.log("dev eui :" , message.end_device_ids.dev_eui) ;

        console.log("dev payload :" , message.uplink_message.frm_payload) ;

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

/*
setInterval(()=>{
    console.log("worker");
    parentPort.postMessage("callback" ) ;
} , 1000) ;
*/

