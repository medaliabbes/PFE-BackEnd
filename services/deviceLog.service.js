const deviceLogModel  = require("./../models/device-log.model") ;


async function Create(log)
{
    return await deviceLogModel.create(log)
}

async function Read(id){
    return await deviceLogModel.findById(id) ;
}

async function ReadAll()
{
    return await deviceLogModel.find({});
}

async function GetDeviceLog(deviceId){
    return await deviceLogModel.find({ deviceid: deviceId});
}


module.exports = {Create , Read , ReadAll ,GetDeviceLog } ;


