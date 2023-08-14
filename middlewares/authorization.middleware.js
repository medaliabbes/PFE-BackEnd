

const bcrypt            =  require('bcrypt');
const userService       =  require('./../services/user.service') ;
const deviceService     =  require('./../services/device.service') ;
const permissionmodule  =  require('./permission.middleware') ;




const shedulerAuthorization = (req , res , next) => {
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

const commandAuthorization  = (req , res , next) => {
    try{

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const alertAuthorization    = (req , res , next) => {
    try{

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}


module.exports = { alertAuthorization , commandAuthorization , shedulerAuthorization } ;