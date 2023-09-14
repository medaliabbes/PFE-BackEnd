

const alertService  = require('./../services/alert.service') ;
//const redis         = require('redis');
const deviceService = require('./../services/device.service');

const Redis = require("ioredis");
const redis = new Redis();

let redisClient ;

async function redisConnect()
{
    redisClient = redis.createClient();
    await redisClient.connect();
}


/**
 * Note : Alerts are put in a list and the redis key for the list is the device TTNid
 *  or device eui
 */

//redisConnect() ;

//console.log(redisClient) ;

/**
 * Add Alert to Redis and database 
 * @param {} req 
 * @param {*} res 
 */
const Create = async(req , res) => {
    try{
        let alert = req.body ;
        
        alert.userid = req.user.id ;


        const deviceTTNid = await deviceService.GetDeviceTTNid(alert.deviceid) ; 

        alert.deviceTTNid = deviceTTNid ;
//

        const ret = await alertService.Create(alert) ;

        console.log('alert create ttnid :' , deviceTTNid);

        console.log(alert) ;
        //ioredis
        await redis.rpush(deviceTTNid , JSON.stringify(alert));

        //await redisClient.rPush(alert.deviceid , JSON.stringify(alert));
        
        res.status(201).json(ret) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json(error) ;
    }
}

const Update = async(req , res) => {
    try{
        const id = req.params.id ; 
        const alert = req.body ;

        const ret = await alertService.Update(id , alert) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {error : error}) ;
    }
}


/**
 * Remove alert from redis and from database
 * @param {*} req 
 * @param {*} res 
 */
const Delete = async(req , res )=>{
    try{
        const id = req.params.id ; 

        

        const ret = await alertService.Delete(id) ;
   
        //const deviceTTNid = await deviceService.GetDeviceTTNid(ret.deviceid) ; 

        const redisElement = { deviceid :  ret.deviceid.toString()  , 
                               sensor   : ret.sensor    ,
                               threshold: ret.threshold , 
                               userid   : ret.userid.toString() ,
                               deviceTTNid : ret.deviceTTNid ,
                             } ;
                            
        console.log(redisElement) ;
        
        console.log(JSON.stringify(redisElement)) ;
        
        //ioredis
        await redis.lrem(ret.deviceTTNid, 1 , JSON.stringify(redisElement));
        //await redisClient.lRem(ret.deviceid.toString(), 1 , JSON.stringify(redisElement));
        
        res.status(200).json(ret) ;

    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {error : error}) ;
    }
}

const Read = async(req, res) =>{
    try{
        const id = req.params.id ; 

        //const alert = await alertService.Read(id) ;

        //ioredis 123456789abbdeff
        let alert = await redis.lrange( "eui-"+id, 0, -1);
        console.log(alert) ;
        
        //alert = JSON.parse(alert) ;

        res.status(200).json({alert :alert}) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {error : error}) ;
    }
}

/**
 * return list of alerts of a particular device 
 */
const GetDeviceAlert = async (req,res) =>{
    try{
        const deviceid = req.params.id ; 

        const alerts = await alertService.FindDeviceAlert(deviceid) ;

        res.status(200).json(alerts) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {error : error}) ;
    }
}

const ReadAll = async (req , res) =>{
    try{
        const alerts = await alertService.ReadAll() ;

        res.status(200).json(alerts) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {error : error}) ;
    }
}

module.exports = { Create , Update , Delete , Read , GetDeviceAlert ,ReadAll} ;