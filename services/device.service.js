
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
    return await deviceModel.findOne(id) ;
}


async function GetAlertList(deviceid)
{
    return await alertModel.find({ deviceid : deviceid}) ;
}

async function GetSchedulerList(deviceid)
{
    return await schedulerModel.find({device : deviceid}) ;
}


module.exports = { Create , Update , Delete , Read , GetAlertList , GetSchedulerList } ;