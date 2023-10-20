

/**
 * this task can be done by a node js worker ,in case the event emitter cause 
 * scalability problem 
 */

require('dotenv').config()  ;
const EventEmitter = require('events') ;
const mqtt         = require('mqtt') ;

let sender = new EventEmitter();

 /**
  * options = { appid = "" , appkey= "" ,  data  = "" , eui   = "" }
  */
sender.on('command-device' ,(options)=>{
  
    const mqttClientOptions = {
        clean: true, // retain session
        connectTimeout: 4000, // Timeout period
        cleintId : "watermonplatform" ,
        username : options.appid  ,
        password : options.appkey ,
    }

    //testing purpose
    {
        let topic = 'v3/'+options.appid+'@ttn/devices/eui-'+options.eui+'/down/push' ;
        console.log("MQTT Sender topic :" , topic) ;
        console.log("app key :", options.appkey );
    }

    const brokerUrl  = process.env.MQTT_BROKER_URL ;

    const TestBrokerUrl = "mqtt://broker.hivemq.com:1883" ;
    
    const mqttClient = mqtt.connect(brokerUrl, mqttClientOptions); 

    mqttClient.on('connect' ,(conn) =>{

        console.log("connected") ;
       
        /**
         * data should be transformed here
         */
        let strBase64 =  new ArrayBuffer(3) ; ;//"data"; //transform options.data to the correct format 
       
       if(options.data === "on" )
       {
       		
       		strBase64[0] = 2 ;
       		strBase64[1] = 1 ;
       		strBase64[2] = 0 ;
       }
       
       else if(options.data ==="off" )
       {
       		strBase64[0] = 2 ;
       		strBase64[1] = 0 ;
       		strBase64[2] = 0 ;
       }
       
       strBase64 = btoa(String.fromCharCode.apply(null, strBase64));
       
       console.log(strBase64) ;
       
        const payload = '{"downlinks":[{"f_port": 2,"frm_payload":"'+ strBase64

                +'","priority": "NORMAL"}]}' ; 
        
        //transform options.data
        
        const topic = 'v3/'+options.appid+'@ttn/devices/eui-'+options.eui+'/down/push' ;

        //console.log("MQTT Sender : " , topic) ;

        //const topic = "watermoon/test/application";

        //mqttClient.publish(topic ,JSON.stringify( mqttClientOptions) ) ;

        mqttClient.publish(topic , payload) ;

        mqttClient.end() ;
    } ) ;
}) ;

module.exports = sender ;


/*
//exemple data transformer
//processing class 

let Formater = new processingModule() ;

let m = new lmFormatter() ; 

m.setBatteryCurrent(23.2)  ;
m.setBatteryVoltage(13.3)  ;
m.setTemperature(25.22)     ;
m.setInverterState(1)      ; 

strBase64 = Buffer.from(packet).toString('base64') ;
for(let i = 0 ; i< 4 ;i++)
{
    m.setOutputPinState(i+1 , command.command[i]) ;
    Formater.setOutputPinState(i+1 , command.command[i]) ;
}

let packet = m.Serialize() ;

const packetStringBase64 = Formater.getPayloadString64() ;
let strBase64 = Buffer.from(packet).toString('base64') ; 

console.log("packet :" , Formater.getPacket()) ;
console.log("base64 :" , packetStringBase64) ;

const payload = '{"downlinks":[{"f_port": 2,"frm_payload":"'+ strBase64//packetStringBase64
                +'","priority": "NORMAL"}]}'
client.publish('v3/app-avempace@ttn/devices/eui-'+device.eui+'/down/push' ,
    payload) ;

*/
