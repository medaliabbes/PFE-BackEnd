
const deviceModel    = require('./../models/device.model') ;
const alertModel     = require('./../models/alert.model');
const schedulerModel = require('./../models/scheduler.model') ;


async function Create(device)
{
    return await  deviceModel.create(device) ;
}

async function Update(id , device)
{
    return await deviceModel.findByIdAndUpdate(id , device) ;
}

async function Delete(id)
{
    return await deviceModel.findByIdAndDelete(id) ;
}

async function Read(id)
{
    return await deviceModel.findById(id) ;
}


async function GetAlertList(deviceid)
{
    return await alertModel.find({ deviceid : deviceid}) ;
}

async function GetSchedulerList(deviceid)
{
    return await schedulerModel.find({device : deviceid}) ;
}

async function GetUserListOfDevices(userid)
{
    return await deviceModel.find({ ownerid : userid}) ;
}

async function GetDeviceByTTNid(deviceTTNid)
{
    return await deviceModel.findOne({ttnid : deviceTTNid});
}

async function GetDeviceTTNid(id){
    const device = await deviceModel.findById(id);
    return device.ttnid ; 
}
module.exports = { Create , Update , Delete , Read , GetDeviceByTTNid , GetDeviceTTNid ,
                   GetAlertList , GetSchedulerList , GetUserListOfDevices} ;
