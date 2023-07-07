

const ZoneModel = require('./../models/zone.model') ;
const DeviceModel = require('./../models/device.model') ;

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
 * Get all the zones of a particular user 
 * @param {*} userID 
 */
async function GetZonesByUserId(userID)
{
    return await ZoneModel.find({userid :userID}) ;
}

/**
 * Get all devices of a particular zone 
 * @param {*} zoneID 
 */
async function GetListOfDevices(zoneID)
{
    return await DeviceModel.find({zoneid : zoneID}) ;
}

module.exports = { Create , Update , Delete , Read ,GetZonesByUserId , GetListOfDevices} ;

