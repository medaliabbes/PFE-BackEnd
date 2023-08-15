
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

module.exports = { Create , Update , Delete , Read ,
                   GetAlertList , GetSchedulerList , GetUserListOfDevices} ;
