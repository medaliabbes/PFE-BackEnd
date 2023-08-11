

const bcrypt           = require('bcrypt');
const userService      = require('./../services/user.service') ;
const deviceService    = require('./../services/device.service') ;
const permissionmodule = require('./permission.middleware') ;

const deviceAuthorization   = async (req , res , next) => {
    try{

        console.log("user :",req.user) ;

        //console.log(req.user.id) ;

        const permissionCode = req.user.iam ; //await userService.GetUserPermissionLevel(req.user.id) ;

        console.log(permissionCode) ;

        let userpermission = new permissionmodule.permission(permissionCode) ;

        if(req.method === 'GET')//read
        {
            //console.log('myget');
            if(userpermission.DEVICES.isReadPermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
        }
        else if(req.method === 'DELETE')//delete
        {
            if(userpermission.DEVICES.isDeletePermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
        }
        else if(req.method === 'POST')//create
        {
            if(userpermission.DEVICES.isCreatePermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
        }
        else if(req.method === 'PUT')//update
        {
            console.log("put req") ;
            console.log(userpermission.DEVICES.isUpdatePermitted() ) ;
            if(userpermission.DEVICES.isUpdatePermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else{
            console.log("Unauthorized Request") ;
            res.status(401).json({message : "Unauthorized Request"}) ;
        }
        //console.log(req.method) ;
        //next() ;
        
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const zoneAuthorization     = async (req , res , next) => {
    try{
        console.log("user :",req.user) ;

        console.log(req.user.id) ;

        const permissionCode = req.user.iam ;

        let userpermission   = new permissionmodule.permission(permissionCode) ;

        if(req.method === "POST") 
        {
            if(userpermission.ZONES.isCreatePermitted()==true)
            {
                console.log("POST Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "GET")
        {
            if(userpermission.ZONES.isReadPermitted()==true)
            {
                console.log("GET Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "PUT")
        {
            if(userpermission.ZONES.isUpdatePermitted()==true)
            {
                console.log("PUT Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "DELETE")
        {
            if(userpermission.ZONES.isDeletePermitted()==true)
            {
                console.log("DELETE Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else{
            console.log("unknown error ") ;
        }

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
} 

const userAuthorization     = (req , res , next) => {
    try{
        let userpermission   = new permissionmodule.permission(req.user.iam) ;

        if(req.method === "POST")
        {
            if(userpermission.USERS.isCreatePermitted() == true)
            {
                console.log("USERS POST Permitted") ;
                req.body.addby = req.user.id ; 
                console.log("added by:" , req.body.addby) ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request" });
            }
        }
        else if(req.method === "PUT")
        {
            if(userpermission.USERS.isUpdatePermitted() == true)
            {
                console.log("USERS PUT Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request" });
            }
        }
        else if(req.method === "DELETE")
        {
            if(userpermission.USERS.isDeletePermitted() == true)
            {
                console.log("USERS DELETE Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request" });
            }
        }
        else if(req.method === "GET")
        {
            if(userpermission.USERS.isReadPermitted() == true)
            {
                console.log("USERS GET Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request" });
            }
        }
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const shedulerAuthorization = (req , res , next) => {
    try{

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


module.exports = { alertAuthorization , commandAuthorization , shedulerAuthorization , 
                   userAuthorization  , zoneAuthorization    , deviceAuthorization  } ;