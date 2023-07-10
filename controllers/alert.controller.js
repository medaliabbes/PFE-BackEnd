

const alertService  = require('./../services/alert.service') ;


const Create = async(req , res) => {
    try{
        const alert = req.body ;
        const ret = await alertService.Create(alert) ;
        res.status(201).json(ret) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {message : error}) ;
    }
}

const Update = async(req , res) => {
    try{
        const id = req.params.id ; 
        const alert = req.body ;

        const ret = await alertService.Update(id , alert) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {message : error}) ;
    }
}

const Delete = async(req , res )=>{
    try{
        const id = req.params.id ; 

        const ret = await alertService.Delete(id) ;

        res.status(200).json(ret) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {message : error}) ;
    }
}

const Read = async(res, res) =>{
    try{
        const id = req.params.id ; 

        const alert = await alertService.Read(id) ;

        res.status(200).json(alert) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {message : error}) ;
    }
}

/**
 * return list of alerts of a particular device 
 */
const GetDeviceAlert = async (req,res) =>{
    try{
        const deviceid = req.params.id ; 

        const alerts = await alertService.FindDeviceAlert(deviceid) ;

        res.status(200).json(alerts) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json( {message : error}) ;
    }
}

module.exports = { Create , Update , Delete , Read , GetDeviceAlert } ;