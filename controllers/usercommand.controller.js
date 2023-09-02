
const userCommandService  = require('./../services/usercommand.service') ;
const deviceService       = require('./../services/device.service') ;
const processingModule    = require('./../utilities/messageFormater') ;
const mqtt                = require('mqtt') ;
const lmFormatter         = require('./../utilities/loramessageformater');



const mqttClientOptions = {
    clean: true, // retain session
    connectTimeout: 4000, // Timeout period
    clientId: 'testclient',
    username: 'app-avempace',
    password: 'NNSXS.CJZRIJFXBXKSAPFYBDBWOVOMBDOGQXUGCHTROLI.YJAHFLN5HHU7M3MMBSVDIEXV2U3IQB4EPTLYA6IHKULHYJ4OFXCQ',
} ;

const connectUrl = 'mqtts://eu1.cloud.thethings.network:8883';
const client = mqtt.connect(connectUrl, mqttClientOptions); 

client.on('connect', (error) => {
    console.log('connecting:', error);
    client.subscribe('#') ;//subscribe to all application topic
}) ;

client.on('message', (topic, message) => {
    //console.log('receive message：', topic, message.toString()) ;
    console.log('topic :' , topic) ;
    message = JSON.parse(message) ;
    //console.log(message)
    try{
        console.log("dev eui :" , message.end_device_ids.dev_eui) ;
        console.log("dev payload :" , message.uplink_message.frm_payload) ;
        let buff = new Buffer.from(message.uplink_message.frm_payload, 'base64');
        let text = buff.toString('ascii');
        console.log(buff) ;//this is the data
    }
    catch(err)
    {
        //console.log(err) ;
        console.log("err :" , ) ;
    }
   
}) ;


const Create = async (req , res) => {
    try{
        const command = req.body ;

        console.log("command : " , command) ;
        //when Controlling a single device 
        if(command.deviceid )
        {
            const device = await deviceService.Read(command.deviceid) ;
        
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
        }

        const ret = {} ; //await userCommandService.Create(command) ;

        res.status(201).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


//remove this method 
const Update = async (req , res) => {
    try{
        const id = req.params.id ;
        const command = req.body ;
        const ret = await userCommandService.Update(id , command) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


//remove this 
const Delete = async (req , res) => {
    try{
        const id = req.params.id ;
        const ret = await userCommandService.Delete(id) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


const Read = async (req , res) => {
    try{
        const id = req.params.id ;
        const ret = await userCommandService.Read(id) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


const GetUserCommand  = async (req , res) => {
    try{
        const userid = req.params.id ;
        const ret = await userCommandService.findUserCommand(userid) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


const GetZoneCommands = async (req , res) => {
    try{
        const zoneid = req.params.id ;
        const ret = await userCommandService.findZoneCommand(zoneid) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


const GetDeviceCommand = async(req , res) => {
    try{
        const deviceid = req.params.id ;
        const ret = await userCommandService.findDeviceCommand(deviceid) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


const ReadAll = async(req , res )=>{
    try{
        const commands = await userCommandService.GetAllCommand() ;
        res.status(200).json(commands) ;
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}


module.exports = { Create , Update , Delete , Read , ReadAll ,
                   GetUserCommand , GetZoneCommands , GetDeviceCommand };