

const ZoneModel   = require('./../models/zone.model') ;
const DeviceModel = require('./../models/device.model') ;
const AlertModel  = require('./../models/alert.model') ;
const SchedulerModel = require('./../models/scheduler.model');

async function Create(zone){
    return await ZoneModel.create(zone) ;
}

async function Update(id , zone){
    return await ZoneModel.findByIdAndUpdate(id , zone) ;
}

async function Delete(id)
{
    return await ZoneModel.findByIdAndDelete(id) ;
}

async function Read(id){
    return await ZoneModel.findById(id) ;
}

/**
 * Get all devices of a particular zone 
 * @param {*} zoneID 
 */
async function GetListOfDevices(zoneID)
{
    return await DeviceModel.find({zoneid : zoneID}) ;
}

/**
 * 
 * @param {*} zoneid 
 * @returns list of scheduler of a particular zone 
 */
async function GetListOfScheduler(zoneid)
{
    return await SchedulerModel.find({zone : zoneid}) ;
}

async function ReadAll()
{
    return await ZoneModel.find() ;
}

async function GetTTnId(id)
{
    let zone = await ZoneModel.findById(id) ;
    return zone.ttnid ;
}

module.exports = { Create , Update , Delete , Read ,
                   GetListOfDevices , GetListOfScheduler , ReadAll ,GetTTnId} ;

