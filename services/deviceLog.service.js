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

async function DeleteLog(){
    return await deviceLogModel.deleteMany({});
}

async function GetDeviceLogByDate(deviceid , start , end ){

    if(start && end )
    {
        let ret = await deviceLogModel.find({deviceid : deviceid , timestamp :
                { $gte: start, $lte: end}}) ;
        return ret ;
    }
    else if(start)
    {
        return 
    }

    else return null ;
}

module.exports = {Create , Read , ReadAll ,GetDeviceLog ,DeleteLog ,GetDeviceLogByDate} ;


