

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

const DeleteAll = async(req , res)=>{
    try{
        const log = await DeviceLogService.DeleteLog() ;

        res.status(200).json(log) ;
    }catch(e){

    }
}


/**
 * the correct request body format
 * {
    "startdate" : "2023-09-14T22:48:28.169Z",
    "enddate" :"2023-09-14T22:50:28.169Z"
   }
 */
const GetDeviceLogByDate = async(req , res) =>{
    try{
        const deviceid = req.params.id ;


        let log = await DeviceLogService.GetDeviceLogByDate(deviceid ,
                         req.body.startdate , req.body.enddate);

        res.status(200).json(log);

    }catch(e)
    {
        res.status(500).json(e);
    }
}

module.exports = {ReadAll , GetDeviceLog , DeleteAll ,GetDeviceLogByDate} ;