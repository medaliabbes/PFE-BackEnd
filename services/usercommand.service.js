

const userCommandModel = require('./../models/usercommand.model') ;


async function Create(_command)
{
    return await userCommandModel.create(_command) ;
}

async function Update(id , _command)
{
    return await userCommandModel.findByIdAndUpdate(id , _command) ;
}

async function Delete(id)
{
    return await userCommandModel.findByIdAndDelete(id) ;
}

async function Read(id)
{
    return await userCommandModel.findOne({_id : id}) ;   
}

async function findUserCommand(userId)
{
    return await userCommandModel.find({userid : userId}) ;
}

async function findZoneCommand(zoneId)
{
    return await userCommandModel.find({zoneid : zoneId}) ;
}

async function findDeviceCommand(deviceId)
{
    return await userCommandModel.find({deviceid : deviceId}) ;
}

module.exports = { Create , Update , Delete , Read , 
                   findUserCommand ,findZoneCommand ,findDeviceCommand };
