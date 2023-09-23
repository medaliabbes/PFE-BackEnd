
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
        let userpermission = req.body.permissionlevel ;
        console.log("permision Level :" ,) ;
        //set the permission 
        /*const permission = new permissionmodule.permission() ;
        permission.DEVICES.AllowRead()   ;
        permission.ALERTS.AllowRead()    ;
        permission.ZONES.AllowRead()     ;
        permission.SCHEDULER.AllowRead() ;
        permission.USERCOMMAND.AllowRead() ;
        */

        req.body.permissionLevel = PermissionObejectToNumber(userpermission) ;//permission.getPermissionCode() ;
   
    }

    next() ;
}

/**
 * zones: { Read: 1, Write: 0 },
  devices: { Read: 1, Write: 0 },
  users: { Read: 0, Write: 0 },
  alerts: { Read: 1, Write: 0 },
  schedulers: { Read: 1, Write: 1 },
  userCommands: { Read: 1, Write: 1 }

 */
function PermissionObejectToNumber(PermissionObject){
    const permission = new permissionmodule.permission() ;
        

    if(PermissionObject.zones.Read === 1)
    {
        permission.ZONES.AllowRead()     ;
    }
    if(PermissionObject.zones.Write === 1)
    {
        permission.ZONES.AllowCreate() ;
    }

    if(PermissionObject.devices.Read === 1)
    {
        permission.DEVICES.AllowRead() ;
    }
    if(PermissionObject.devices.Write === 1)
    {
        permission.DEVICES.AllowCreate();
    }

    if(PermissionObject.alerts.Read === 1)
    {
        permission.ALERTS.AllowRead() ;
    }
    if(PermissionObject.alerts.Write === 1)
    {
        permission.ALERTS.AllowCreate();
    }

    if(PermissionObject.users.Read === 1)
    {
        permission.USERS.AllowRead() ;
    }
    if(PermissionObject.users.Write === 1)
    {
        permission.USERS.AllowCreate();
    }

    if(PermissionObject.schedulers.Read === 1)
    {
        permission.SCHEDULER.AllowRead() ;
    }
    if(PermissionObject.schedulers.Write === 1)
    {
        permission.SCHEDULER.AllowCreate();
    }

    if(PermissionObject.userCommands.Read === 1)
    {
        permission.USERCOMMAND.AllowRead() ;
    }
    if(PermissionObject.userCommands.Write === 1)
    {
        permission.USERCOMMAND.AllowCreate();
    }

    
    return permission.getPermissionCode() ;
}


module.exports = { userAuthorization , userPostAuthorization } ;