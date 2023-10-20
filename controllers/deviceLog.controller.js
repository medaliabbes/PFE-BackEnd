

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

const GetDeviceLogCount = async(req , res) => {
    try{
        const count = req.params.count ;
        const deviceid = req.params.id ;
        const ret = await DeviceLogService.GetDeviceLogByCount(deviceid , count) ;
        console.log(`device id : ${deviceid} count ${count}`) ; 
        res.status(200).json(ret) ;
    }catch(e){
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const GetDeviceSensorCount = async( req , res ) => {

    try{
        const count    = req.params.count ;
        const deviceid = req.params.id ;
        const sensor   = req.params.sensor ;

        if(sensor != "temperature" &&
           sensor != "humidity"    && 
           sensor != "soilmoisture")
        {
            res.status(200).json({message : 'Sensor data not available'}) ;
        }
        else{
            const ret      = await DeviceLogService.GetDeviceSensorByCount(deviceid ,sensor, count) ;
            res.status(200).json(ret) ;
        }
        
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

module.exports = {
                    ReadAll , GetDeviceLog , DeleteAll,GetDeviceLogCount ,
                    GetDeviceLogByDate     , GetDeviceSensorCount 
                 } ;



