
const SchedulerService   = require('./../services/scheduler.service') ;
//const redis              = require('redis');

const Redis = require("ioredis");
const redis = new Redis();

let redisClient ;

async function redisConnect()
{
    redisClient = redis.createClient();
    await redisClient.connect();
}

//redisConnect() ;

/**
 * ADD Scheduler to Redis and database
 * 
 * All controller should be protected againest unauthorized access 
 * Create request body{
    "dayOftheWeek": "Sun",
    "timeOftheDay": "8:54",
    "Duration": "00:23",
    "device": "64f3ed07e88ad20e5f2ffed2"
    }
 */
const Create = async (req , res) => {

    try {
        const scheduler = req.body ;
        
        const ret = await SchedulerService.Create(scheduler) ;

        const listKey = scheduler.dayOftheWeek +'-'+scheduler.timeOftheDay ;

        console.log("redis scheduler key " , listKey) ;

        //a list can hold multiple scheduler of different devices and zones but have 
        //the same start time 
        //await redisClient.rPush(listKey ,JSON.stringify( scheduler)) ;

        //ioredis
        await redis.rpush(listKey ,JSON.stringify( scheduler)) ;
        
        res.status(201).json(ret) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({error : error}) ;
    }
}


const Update = async (req , res) => {

    try {
        const id        = req.params.id ;
        const scheduler = req.body      ;

        let ret     = await SchedulerService.Read(id) ;

        let redisElement = SchedulerModelToRedisFormat(ret) ;

        let listKey = ret.dayOftheWeek + '-' + ret.timeOftheDay ; 

        console.log(redisElement) ;
        //remove old scheduler 
        const resp = await redis.lrem(listKey , 0 ,redisElement) ;

        console.log(resp) ;
        
        ret         = await SchedulerService.Update(id ,scheduler) ;

        ret = await SchedulerService.Read(id) ;

        redisElement = SchedulerModelToRedisFormat(ret) ;

        listKey = ret.dayOftheWeek + '-' + ret.timeOftheDay ;

        //insert the new scheduler 
        await redis.rpush(listKey  , redisElement );

        
        
        res.status(200).json({message : "update"}) ;

    } catch (error) {
        console.error(error) ;
        res.status(500).json({error : error}) ;
    }
}


/**
 * Remove scheduler from redis and database
 * @param {} req 
 * @param {*} res 
 */
const Delete = async (req , res) => {

    try {
        const id = req.params.id ; 

        let ret  = await SchedulerService.Delete(id) ;

        /***************************************************** */
        let redisElement = SchedulerModelToRedisFormat(ret)

        /************************************************************/

        const listKey = ret.dayOftheWeek +'-'+ret.timeOftheDay ;
        
        //ioredis
        await redis.lrem(listKey ,0, redisElement ) ;
        //let redisresp = await redis.lrange(listKey , 0 ,-1) ;

        //console.log(redisresp) ;

        res.status(200).json(ret) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({error : error}) ;
    }
}

const Read = async (req , res) => {
    try {
        const id = req.params.id ; 
        let ret  = await SchedulerService.Read(id) ;

        res.status(200).json(ret) ;
        
    } catch (error) {
        console.error(error) ;
        res.status(500).json({error : error}) ;
    }
}

//get the shedulers of a particular device 
const GetDeviceSheduler = async (req , res ) =>{
    try {
        const deviceid =  req.params.id ;
        const ret      =  await SchedulerService.FindDeviceScheduler(deviceid) ;
        res.status(200).json(ret) ;
    } catch (error) {
        console.error({error : error}) ;
        res.status(500).json(error) ;
    }
}


const GetZoneSheduler = async(req , res) => {
    try {
        const zoneid =  req.params.id ;
        const ret      =  await SchedulerService.FindZoneScheduler(zoneid) ;
        res.status(200).json(ret) ;
    } catch (error) {
        console.error({error : error}) ;
        res.status(500).json(error) ;
    }
}

const ReadAll  = async(req,res) =>{
    try{
        const ret = await SchedulerService.ReadAll() ; 
        res.status(200).json(ret) ;
    }catch(e){
        console.log(e) ;
        res.status(500).json(e) ; 
    }
}

function SchedulerModelToRedisFormat(Scheduler)
{
    let redisElement = new Object();

    redisElement.dayOftheWeek = Scheduler.dayOftheWeek ;
    redisElement.timeOftheDay = Scheduler.timeOftheDay ;
    redisElement.Duration     = Scheduler.Duration     ;
    if(Scheduler.zone != undefined)
    {
        redisElement.zone = Scheduler.zone.toString() ;
    }
    else{
        redisElement.device = Scheduler.device.toString() ;
    }

    return JSON.stringify(redisElement) ;
}

module.exports = { Create , Update , Delete , Read ,
                   GetDeviceSheduler , GetZoneSheduler , ReadAll } ;
