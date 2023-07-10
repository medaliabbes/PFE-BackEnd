
const ZoneService    = require('./../services/zone.service') ;


const Create = async (req , res) => {
    try{
        /**
         * authorization should be checked in a middleware that will be executed before 
         * this controller 
         */

        /**
         * all zone info should be filled in the front-end including userid
         */
        const zone = req.body ;
        const ret = await ZoneService.Create(zone) ;
        res.status(201).json(ret) ;

    }catch(error)
    {
        console.error(error) ; 
        res.status(500).json({message : error}) ;
    }
}

const Update = async (req , res) => {
    try{
        /**
         * user Permission should be checked in a middleware before this controller
         */
        const zoneid = req.params.id ;
        const zone   = req.body ;

        const ret = await ZoneService.Update(zoneid , zone) ;

        res.status(200).json(ret) ;
    }
    catch(error)
    {
        console.error(error) ;
        res.status(500).json({message : error}) ;
    }
}

const Delete = async (req , res) => {
    try{
        /**
         * user Permission should be checked in a middleware before this controller
         */
        const id = req.params.id ;
        let ret  = await ZoneService.Delete(id) ;
        res.status(200).json(ret)  ;

    }catch(error)
    {
        console.error(error) ;
        res.status(500).json({message : error}) ;
    }
}

const Read = async (req , res) => {
    try{
        /**
         * user Permission should be checked in a middleware before this controller
         */
        const id = req.params.id ; 
        const zone = await ZoneService.Read(id) ;
        res.status(200).json(zone) ;
    }catch(error)
    {
        console.error(error) ;
        res.status(500).json({message : error}) ;
    }
}

/**
 * return list of devices of a zone 
 * @param {*} req 
 * @param {*} res 
 */
const GetListOfDevices =  async(req , res) =>{
    try{
        const zoneid = req.params.id ;
        const ret = await ZoneService.GetListOfDevices(zoneid) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error)
        res.status(500).json({message : error}) ;
    }
}

const GetListOfScheduler = async(req , res) =>{
    try{
        
        const zoneId  =  req.params.id ; 
        const ret = await ZoneService.GetListOfScheduler(zoneId) ;
        res.status(200).json(ret) ;

    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}


module.exports = { Create , Update , Delete , Read ,
                   GetListOfDevices , GetListOfScheduler} ;
