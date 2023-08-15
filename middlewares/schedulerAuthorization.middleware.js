
const deviceService     =  require('./../services/device.service') ;
const zoneService       =  require('./../services/zone.service') ;
const permissionmodule  =  require('./permission.middleware') ;



const schedulerAuthorization = (req , res , next) => {
    try{

        const user = req.user ; 

        const permission = new permissionmodule.permission(user.iam) ;

        if(req.method === "POST")
        {
            if(permission.SCHEDULER.isCreatePermitted() == true)
            {
                console.log("SCHEDULER POST Permitted") ;
                next() ;
            }   
            else{
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "GET")
        {
            if(permission.SCHEDULER.isReadPermitted() == true)
            {
                console.log("SCHEDULER GET Permitted") ;
                next() ;
            }   
            else{
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "DELETE")
        {
            if(permission.SCHEDULER.isDeletePermitted() == true)
            {
                console.log("SCHEDULER DELETE Permitted") ;
                next() ;
            }   
            else{
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "PUT")
        {
            if(permission.SCHEDULER.isUpdatePermitted() == true)
            {
                console.log("SCHEDULER PUT Permitted") ;
                next() ;
            }   
            else{
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else{
            console.log("error" ) ;
            res.status(500).json({message : 'Unknown Error'}) ;
        }
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const schedulerPostAuthorization = async (req , res , next) => {
    try{
        if(req.user.addby != null)
        {
            req.user.id = req.user.addby ;
        }

        if(req.method === "POST")
        {
            if(req.body.zone != undefined && req.body.device != undefined)
            {
                console.log("json format error") ;
                //40 status code for bad request 
                res.status(400).json({message : 'zone or device both set'}) ;
            }
            else if(req.body.zone != undefined)
            {
                const zone = await zoneService.Read(req.body.zone) ;
                //console.log("zone :",zone) ;
                if(zone.userid == req.user.id)
                {
                    next() ;
                }
                else{
                    console.log("user Dosn't have permission") ;
                    res.status(403).json({message : "Dosn't have permission"}) ;
                }
               
            }
            else if(req.body.device != undefined)
            {
                const device = await deviceService.Read(req.body.device) ;
                if(device.ownerid == req.user.id)
                {
                    next() ;
                }
                else{
                    res.status(403).json({message : "Dosn't have permission" }) ;
                }
            }
            else{
                console.log('error') ;
                res.status(400).json({message : "missing field zone or device"}) ;
            }
            
        }
        else{
            //other request 
            next() ;
        }
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
} 

module.exports = { schedulerAuthorization , schedulerPostAuthorization }