const mqtt = require('mqtt') ;

const LoRaMessageFormatter = require('./utilities/loramessageformater') ;
// connection option
const options = {
    clean: true, // retain session
connectTimeout: 4000, // Timeout period
// Authentication informat
clientId: 'testclient',
username: 'avempace-watermon',
//
password: 'NNSXS.CJZRIJFXBXKSAPFYBDBWOVOMBDOGQXUGCHTROLI.YJAHFLN5HHU7M3MMBSVDIEXV2U3IQB4EPTLYA6IHKULHYJ4OFXCQ',//'NNSXS.67LMQSOL7VSLYCEVHFEPKG76I5LUU7HGLAL77CA.GWCKHUFA2ZZVKV7ELF6DQVXIXNS6AI45UX34VZWGJWZO5R23DK2Q',
//password : 'NNSXS.FYG2GFYUMUIEHKWVDQUAARMB57C7LZEDAMNRZFA.DQP3AXZWT637I3HGF62ZLOHX76CLEES42OJOBSFXPDX2TSLUMCQQ',
}

// Connect string, and specify the connection method by the protocol
// ws Unencrypted WebSocket connection
// wss Encrypted WebSocket connection
// mqtt Unencrypted TCP connection
// mqtts Encrypted TCP connection
// wxs WeChat applet connection
// alis Alipay applet connection
const connectUrl = 'mqtts://eu1.cloud.thethings.network:8883';
const client = mqtt.connect(connectUrl, options);

client.on('connect', (error) => {
console.log('connecting:', error);
    client.publish('v3/avempace-watermon@ttn/devices/eui-70b3d57ed005c844/down/push' ,
    '{"downlinks":[{"f_port": 2,"frm_payload":"vBASmpm5Qc3MVEGPwslBAQ==","priority": "NORMAL"}]}') ;
    //vBAEmpm5Qc3MVEGameFBAQ==
    //vBAEmpm5Qc3MVEGameFBAQ==
    //vBAEmpm5Qc3MVEGPwslBAQ==
   client.subscribe('#') ;
}) ;

client.on('error', (error) => {
    console.log('Connection failed:', error) ;
}) ;

client.on('message', (topic, message) => {
    //console.log('receive message：', topic, message.toString()) ;
    console.log('topic :' , topic) ;
    message = JSON.parse(message) ;

    //console.log(message)
    try{
        console.log("dev eui :" , message.end_device_ids.dev_eui) ;
        console.log("dev payload :" , message.uplink_message.frm_payload) ;
        let buff = new Buffer(message.uplink_message.frm_payload, 'base64');
        let text = buff.toString('ascii');
        console.log(buff) ;//this is the data
        let formater = new LoRaMessageFormatter( message.uplink_message.decoded_payload.bytes) ;
        //formater.Deserialize() ;
        console.log("ffff :" ,formater.getTemperature()) ;
    }
    catch(err)
    {
        console.log(err) ;
    }
   
}) ;

/**
 *  uplink_message: {
    session_key_id: 'AYglNoVhAh0JBK8SskTPLQ==',
    f_port: 2,
    f_cnt: 43,
    frm_payload: '/BACMzODQrp3iEBmhSpCAA==',
    decoded_payload: { bytes: [Array] },
    rx_metadata: [ [Object] ],
 */