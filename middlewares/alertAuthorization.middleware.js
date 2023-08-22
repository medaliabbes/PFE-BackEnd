
const deviceService     =  require('./../services/device.service') ;
const permissionmodule  =  require('./permission.middleware') ;



const alertAuthorization    = (req , res , next) => {
    try{
        
        const userPermission = new permissionmodule.permission(req.user.iam) ;
        
        if(req.method === "POST")
        {
            if(userPermission.ALERTS.isCreatePermitted() )
            {
                next() ;
            }
            else{
                console.log("User Not Permitted") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "GET")
        {
            if(userPermission.ALERTS.isReadPermitted() )
            {
                next() ;
            }
            else{
                console.log("User Not Permitted") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "PUT")
        {
            if(userPermission.ALERTS.isUpdatePermitted() )
            {
                next() ;
            }
            else{
                console.log("User Not Permitted") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "DELETE")
        {
            if(userPermission.ALERTS.isDeletePermitted() )
            {
                next() ;
            }
            else{
                console.log("User Not Permitted") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else{
            res.status(501).json({message : 'Not Implemented'}) ;
        }
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const alertPostAuthorization = async (req , res ,next) =>{
    try{
        const user = req.user ;

        if(req.method === "POST")
        {
            let myuserid ;

            if(user.addby != null)
            {
                myuserid = user.addby ;
            }
            else{
                myuserid = user.id ;
            }
            const device = await deviceService.Read(req.body.deviceid) ;

            if(device != null && device.ownerid == myuserid)
            {
                next() ;
            }
            else{
                res.status(403).json( {message : "Device Dosn't bellong to user"}) ;
            }

        }else{
            next() ;
        }
        
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e)
    }
}

module.exports = { alertAuthorization , alertPostAuthorization} ;
