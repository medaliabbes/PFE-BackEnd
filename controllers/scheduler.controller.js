
const SchedulerService    = require('./../services/scheduler.service') ;


/**
 * All controller should be protected againest unothorized use 
 */
const Create = async (req , res) => {

    try {
        const scheduler = req.body ;
        const ret = await SchedulerService.Create(scheduler) ;
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
        const ret = await SchedulerService.Update(id ,scheduler) ;
        res.status(200).json(ret) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({error : error}) ;
    }
}

const Delete = async (req , res) => {

    try {
        const id = req.params.id ; 
        let ret  = SchedulerService.Delete(id) ;
        res.status(200).json(ret) ;
    } catch (error) {
        console.error(error) ;
        res.status(500).json({error : error}) ;
    }
}

const Read = async (req , res) => {

    try {
        const id = req.params.id ; 
        let ret  = SchedulerService.Read(id) ;
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

module.exports = { Create , Update , Delete , Read ,
                   GetDeviceSheduler , GetZoneSheduler} ;
