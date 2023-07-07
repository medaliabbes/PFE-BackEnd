

const SchedulerModel   = require('./../models/scheduler.model');


async function Create(scheduler)
{
    return await SchedulerModel.create(scheduler)
}

async function Update(id , scheduler)
{
    return await SchedulerModel.findByIdAndUpdate(id , scheduler) ;   
}

async function Delete(id)
{
    return await SchedulerModel.findByIdAndDelete(id) ;
}

async function Read(id)
{
    return await SchedulerModel.findOne(id) ;
}

/**
 * Get schedulers of a device 
 * @param {*} deviceid the device id
 * @returns   list of scheduler
 */
async function FindDeviceScheduler(deviceid)
{
    return await SchedulerModel.find({device : device}) ;
}

/**
 * Get sccheduler of a zone 
 * @param {*} zoneid 
 * @returns   list of scheduler
 */
async function FindZoneScheduler(zoneid)
{
    return await SchedulerModel.find({zone : zoneid}) ;
}

module.exports = { Create , Update , Delete , Read ,
                   FindDeviceScheduler , FindZoneScheduler} ;