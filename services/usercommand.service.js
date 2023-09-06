

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

/**
 * 
 * @param {*} zoneId 
 * @returns commands executed on a particular zone
 *///find zone list of command
async function findZoneCommand(zoneId)
{
    return await userCommandModel.find({zoneid : zoneId}) ;
}

/**
 * 
 * @param {*} deviceId 
 * @returns executed on particular device
 */
async function findDeviceCommand(deviceId)
{
    return await userCommandModel.find({deviceid : deviceId}) ;
}

async function DeleteAll(){
    return await userCommandModel.deleteMany({}) ;
}

async function GetAllCommand()
{
    return await userCommandModel.find({});
}

module.exports = { Create , Update , Delete , Read , GetAllCommand ,DeleteAll ,
                   findUserCommand ,findZoneCommand ,findDeviceCommand };
