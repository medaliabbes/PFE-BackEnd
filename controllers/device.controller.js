
const deviceService    = require('./../services/device.service') ;

const Create = async(req , res) =>
{
    try{
        /**
         * The ttn client api need to be integrated here
         */
        const device = req.body ;
        const ret = await deviceService.Create(device) ;   
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
        res.status(500).json({message : error});
    }
}

const Delete = async(req , res) =>
{
    try{
        
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error});
    }
}

const Read = async(req , res) =>
{
    try{
        
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error});
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
        res.status(500).json({message : error});
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
        res.status(500).json({message : error});
    }
}

module.exports = {  Create , Update ,Delete , Read , 
                    GetListOfSchedulers , GetListOfAlerts} ;