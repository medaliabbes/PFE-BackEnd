
require('dotenv').config() ; 
const ZoneService    = require('./../services/zone.service') ;
const TTNAppService  = require('./../TTNClient/ApplicationService') ;
let AppService  = new TTNAppService(process.env.TTN_KEY) ;

/**
 *@Note : post request for zone should have those param only :
 *                          {
                                "userid" : "64d4cb52fca706a550e9756b",
                                "name"   : "mychebba-zone",
                                "location" : "chebba"
                            } 
 *
 */

//  the userid should be set in the controller after the middleware resolve 
//  the token and provide an object in the req caller user 
const Create = async (req , res) => {
    try{
        /**
         * authorization should be checked in a middleware that will be executed before 
         * this controller 
         */

        /**
         * all zone info should be filled in the front-end including userid
         */
        let zone = req.body ;

        zone.ttnid  = "app-"+zone.name ; 

        let app = {
            collaboratorid : 'hboughzala',//'medaliabbes',
            id   : "app-"+zone.name , //this can be generated  
            name : zone.name 
        } ;
        
        let ret = await AppService.Create(app) ;

        console.log(`TTN responce ${ret.statusCode}  : ${ret.body}`) ;

        if(ret.statusCode != 200 && ret.statusCode != 201)
        {
            console.error('error') ;
            res.status(ret.statusCode).json({message : ret.body}) ;
        }
        else{
            ret = await ZoneService.Create(zone) ;

            res.status(201).json(ret) ;
        }

    }catch(error)
    {
        console.error(error) ; 
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
    }
}

const Delete = async (req , res) => {
    try{
        /**
         * user Permission should be checked in a middleware before this controller
         */
        const id = req.params.id ;

        const ttnid  = await ZoneService.GetTTnId(id) ;
        console.log('ttnid : ' , ttnid) ;
        let apiRes = await AppService.Delete(ttnid) ;     

        console.log(`${apiRes.statusCode } : ${apiRes.body}`) ;

        if(apiRes.statusCode == 200)
        {
            let ret  = await ZoneService.Delete(id) ;
            res.status(200).json(ret)  ;
            
        }else{
            res.status(apiRes.statusCode).json({message : apiRes.body}) ;
        }

    }catch(error)
    {
        console.error(error) ;
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
    }
}

/*
 * Get zones of a particular user , the user id should be provided by the middleware 
 * after checking the JWT 
 */
const GetUserZones = async (req , res) => {
    try{
        const ret  =  await ZoneService.GetUserZones(req.user.id) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json( {error : error}) ;
    }
}

module.exports = { Create , Update , Delete , Read ,
                   GetListOfDevices , GetListOfScheduler , GetUserZones} ;
