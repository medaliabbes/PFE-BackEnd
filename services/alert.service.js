

const alertModel = require('./../models/alert.model');


async function Create(alert )
{
    return await alertModel.create(alert) ;
}

async function Update(id , alert )
{
    return await alertModel.findByIdAndUpdate(id , alert) ;
}

async function Delete(id)
{
    return await alertModel.findByIdAndDelete(id) ;
}

async function Read(id)
{
    return await alertModel.findOne({_id : id})
}

/**
 * find alerts of a particular device 
 */
async function FindDeviceAlert(deviceid)
{
    return await alertModel.find({deviceid : deviceid}) ;
}

async function ReadAll()
{
    return await alertModel.find({}) ;
}

async function GetUserListOfAlerts(user_id)
{
    return await alertModel.find({userid : user_id});
}

module.exports = { Create , Update , Delete , Read ,
    GetUserListOfAlerts, FindDeviceAlert , ReadAll} ;

