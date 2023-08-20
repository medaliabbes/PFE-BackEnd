
const deviceService     =  require('./../services/device.service') ;
const zoneService       =  require('./../services/zone.service') ;
const permissionmodule  =  require('./permission.middleware') ;


const commandAuthorization  = (req , res , next) => {
    console.log("commandAuthorization") ;
    try{
        const userPermission = new permissionmodule.permission(req.user.iam) ;
        //console.log(req.user.iam.toString(16));
        if(req.method === "POST")
        {
            if( userPermission.USERCOMMAND.isCreatePermitted() == true)
            {
                next() ;
            }
            else{
                res.status(403).json({message : 'Write Not Permitted'}) ;
            }
        }   
        else if(req.method === "GET")
        {
            if( userPermission.USERCOMMAND.isReadPermitted() == true)
            {
                next() ;
            }
            else{
                res.status(403).json({message : 'Read Not Permitted'}) ;
            }
        }   
        else{
            console.log(`${req.method} Not Allowed`) ;
            console.log("req error") ;
            res.status(405).json({message : 'Method Not Allowed'}) ;
        } 
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const commandPostAuthorization = async (req,res,next) =>{
    try{
        if(req.method === "POST")
        {    
            req.body.userid = req.user.id ;
            
            if(req.user.addby != null)
            {
                req.user.id = req.user.addby ;
            }

            //command is for a zone 
            if(req.body.zoneid != undefined)
            {
                const zone = await zoneService.Read(req.body.zoneid) ;
                
                if(zone.userid == req.user.id)
                {
                    next() ;
                }
                else{
                    res.status(403).json({message : 'Unauthorized Request'}) ;
                }
            }
            //command is for a device 
            else if(req.body.deviceid != undefined)
            {
                const device = await deviceService.Read(req.body.deviceid) ;

                if(device.ownerid == req.user.id)
                {
                    next() ;
                }
                else{
                    res.status(403).json({message : 'Unauthorized Request'}) ;
                }
            }
            else{
                res.status(501).json({message :'Not Implemented'}) ;
            }
        }
        else{
            next();
        }
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e);
    }
}

module.exports = { commandAuthorization , commandPostAuthorization } ;