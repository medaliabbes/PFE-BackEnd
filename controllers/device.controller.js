require('dotenv').config()  ;
const  deviceService    = require('./../services/device.service')  ;
const  TTNDeviceService = require('./../TTNClient/DevicesService') ;

TTNDeviceService.setToken(process.env.TTN_KEY) ;

const Create = async(req , res) =>
{
    try{
         /**
          * Request format 
            {
                "appid"  : "test-app-medali",
                "ttnid"  : "eui-123456789abbdebb",
                "eui"    : "123456789abbdebb",
                "join"   : "adce78452edb999a",
                "appkey" : "ababcdcdddbb4457ababcdcdddbb4457",
                "name"   : "my-dev-test",
                "ownerid": "64c39db0780c475b84961e01",
                "zoneid" : "64a83bec99dc58cac82a4556"
            }
           */
        const device = req.body ;
        const ttnRes = await TTNDeviceService.Create({
            appid :device.appid ,id :device.ttnid, eui :device.eui , join : device.join
            , appkey :device.appkey ,name: device.name, 
        }) ;  
        if(ttnRes != true)
        {
            console.error("ttn error adding device") ; 
            res.status(500).json({message : 'TTN error'}) ;
        }
        const ret    = await deviceService.Create(device) ;  
        res.status(200).json(ret) ;     
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error});
    }
}

const Update = async(req , res) =>
{
    try{
        
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error});
    }
}

const Delete = async(req , res) =>
{
    try{
        const id = req.params.id ; 
        const ret = await deviceService.Delete(id) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error});
    }
}

const Read = async(req , res) =>
{
    try{
        const deviceId = req.params.id ;
        let deviceinfo = await deviceService.Read(deviceId);
        res.status(200).json(deviceinfo);
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error});
    }
}

const GetListOfSchedulers = async(req , res) =>
{
    try{
     const deviceId = req.params.id ; 
     const mylist   = await deviceService.GetSchedulerList(deviceId) ;
     res.status(200).json(mylist) ;  
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error});
    }
}

const GetListOfAlerts = async(req , res) =>
{
    try{
        const deviceId = req.params.id ;
        const mylist = await deviceService.GetAlertList(deviceId) ;
        res.status(200).json({mylist});
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error});
    }
}

const GetUserListOfDevices = async(req , res) =>
{
    try{
        const userid = req.user.id ; 
        let listOfDevices = await deviceService.GetUserListOfDevices(userid);
        res.status(200).json(listOfDevices) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error});
    }
}

module.exports = {  Create , Update ,Delete , Read , 
                    GetListOfSchedulers , GetListOfAlerts , GetUserListOfDevices} ;