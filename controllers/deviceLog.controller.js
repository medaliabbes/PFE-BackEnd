

const DeviceLogService = require('./../services/deviceLog.service');

const ReadAll = async(req , res)=>{
    try{
        const log = await DeviceLogService.ReadAll() ;
        res.status(200).json(log) ;
    }catch(e){

        res.status(500).json(e);
    }
}


const GetDeviceLog = async(req , res)=>{
    try{
        const deviceid = req.params.id ;

        const log = await DeviceLogService.GetDeviceLog(deviceid) ;

        res.status(200).json(log) ;
    }catch(e){

        res.status(500).json(e);
    }
}

module.exports = {ReadAll , GetDeviceLog} ;