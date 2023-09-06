
const permissionmodule  =  require('./permission.middleware') ;
const bcrypt            =  require('bcrypt');

const userAuthorization     = (req , res , next) => {
    try{
        let userpermission   = new permissionmodule.permission(req.user.iam) ;


        if(req.method === "POST")
        {
            if(userpermission.USERS.isCreatePermitted() == true)
            {
                console.log("USERS POST Permitted") ;
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
            if(req.path === '/permissions')
            {
                next() ;
            }
            else if(userpermission.USERS.isReadPermitted() == true)
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

/**
 * 
 * this middleware is used to set addby field ,encript the password 
 * and set the new user permission
 */
const userPostAuthorization = (req , res , next ) => {
    if(req.method === "POST") 
    {
        console.log("postAuthorization ");
        //set added by field 
        req.body.addby = req.user.id ; 
        
        //encrypt password
        const password = req.body.password ;
        req.body.password  = bcrypt.hashSync(password , 8);

        /**
         * for now allow read permission for all resources later permission 
         * need to be set by the front-end
         */
        //set the permission 
        const permission = new permissionmodule.permission() ;
        permission.DEVICES.AllowRead()   ;
        permission.ALERTS.AllowRead()    ;
        permission.ZONES.AllowRead()     ;
        permission.SCHEDULER.AllowRead() ;
        permission.USERCOMMAND.AllowRead() ;

        req.body.permissionLevel = permission.getPermissionCode() ;
    }

    next() ;
}


module.exports = { userAuthorization , userPostAuthorization } ;