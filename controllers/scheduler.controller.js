
const SchedulerService   = require('./../services/scheduler.service') ;
const redis              = require('redis');

let redisClient ;

async function redisConnect()
{
    redisClient = redis.createClient();
    await redisClient.connect();
}

redisConnect() ;

/**
 * ADD Scheduler to Redis and database
 * 
 * All controller should be protected againest unauthorized access 
 */
const Create = async (req , res) => {

    try {
        const scheduler = req.body ;
        
        const ret = await SchedulerService.Create(scheduler) ;

        const listKey = scheduler.dayOftheWeek +'-'+scheduler.timeOftheDay ;

        //a list can hold multiple scheduler of different devices and zones but have 
        //the same start time 
        await redisClient.rPush(listKey ,JSON.stringify( scheduler)) ;
        
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
        const ret       = await SchedulerService.Update(id ,scheduler) ;
        res.status(200).json(ret) ;
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

        let redisElement = new Object();

        redisElement.dayOftheWeek = ret.dayOftheWeek ;
        redisElement.timeOftheDay = ret.timeOftheDay ;
        redisElement.Duration     = ret.Duration     ;
        if(ret.zone != undefined)
        {
            redisElement.zone = ret.zone.toString() ;
        }
        else{
            redisElement.device = ret.device.toString() ;
        }

        console.log(redisElement) ;

        const listKey = ret.dayOftheWeek +'-'+ret.timeOftheDay ;

        await redisClient.lRem(listKey , 1 , JSON.stringify(redisElement)) ;

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

module.exports = { Create , Update , Delete , Read ,
                   GetDeviceSheduler , GetZoneSheduler , ReadAll } ;
