

const PermissionModule = require('./permissionBase') ;
/**
 * @Note to add a new resource go to ResourcePermission.js add the resource name to
 *       RESOURCES struct and set the resource code ,then create a new PermissionBase 
 *       variable in this class with the resource name 
 */

class permission {
    DEVICES     = new PermissionModule.PermissionBase() ;
    ZONES       = new PermissionModule.PermissionBase() ;
    USERS       = new PermissionModule.PermissionBase() ;
    ALERTS      = new PermissionModule.PermissionBase() ;
    SCHEDULER   = new PermissionModule.PermissionBase() ;
    USERCOMMAND = new PermissionModule.PermissionBase() ;

    constructor(permissionCode = 0)
    {
        this.DEVICES.setResource(PermissionModule.RESOURCES.DEVICES).setPermissionCode(permissionCode) ;
        this.ZONES.setResource(PermissionModule.RESOURCES.ZONES).setPermissionCode(permissionCode) ;
        this.USERS.setResource(PermissionModule.RESOURCES.USERS).setPermissionCode(permissionCode) ;
        this.ALERTS.setResource(PermissionModule.RESOURCES.ALERTS).setPermissionCode(permissionCode) ;
        this.SCHEDULER.setResource(PermissionModule.RESOURCES.SCHEDULER).setPermissionCode(permissionCode) ; 
        this.USERCOMMAND.setResource(PermissionModule.RESOURCES.USERCOMMAND).setPermissionCode(permissionCode) ;
    }

    getPermissionCode()
    {
        let pCode = this.DEVICES.getPermissionCode() | this.ALERTS.getPermissionCode() |
                    this.USERS.getPermissionCode() | this.ZONES.getPermissionCode() |
                    this.SCHEDULER.getPermissionCode() |this.USERCOMMAND.getPermissionCode();
        return pCode ;
    }

    setPermissionCode(pCode)
    {
        this.DEVICES.setPermissionCode(pCode) ;
        this.USERS.setPermissionCode(pCode) ;
        this.SCHEDULER.setPermissionCode(pCode) ;
        this.ZONES.setPermissionCode(pCode) ;
        this.ALERTS.setPermissionCode(pCode) ;
        this.USERCOMMAND.setPermissionCode(pCode) ;
    }

    GetPermissionObject()
    {
        let UserPermissionObject = {
            zones        : { Read : 0 ,Write :0},
            devices      : { Read : 0 ,Write :0},
            users        : { Read : 0 ,Write :0},
            alerts       : { Read : 0 ,Write :0},
            schedulers   : { Read : 0 ,Write :0},
            userCommands : { Read : 0 ,Write :0}
        } ;


        if(this.ZONES.isReadPermitted())
        {
            UserPermissionObject.zones.Read = 1 ;
        }
        if(this.ZONES.isCreatePermitted())
        {
            UserPermissionObject.zones.Write = 1 ;
        }

        if(this.DEVICES.isReadPermitted())
        {
            UserPermissionObject.devices.Read = 1 ;
        }
        if(this.DEVICES.isCreatePermitted())
        {
            UserPermissionObject.devices.Write = 1 ;
        }

        if(this.USERS.isReadPermitted())
        {
            UserPermissionObject.users.Read = 1 ;
        }
        if(this.USERS.isCreatePermitted())
        {
            UserPermissionObject.users.Write = 1 ;
        }

        if(this.ALERTS.isReadPermitted())
        {
            UserPermissionObject.alerts.Read = 1 ;
        }
        if(this.ALERTS.isCreatePermitted())
        {
            UserPermissionObject.alerts.Write = 1 ;
        }

        if(this.SCHEDULER.isReadPermitted())
        {
            UserPermissionObject.schedulers.Read = 1 ;
        }
        if(this.SCHEDULER.isCreatePermitted())
        {
            UserPermissionObject.schedulers.Write = 1 ;
        }

        if(this.USERCOMMAND.isReadPermitted())
        {
            UserPermissionObject.userCommands.Read = 1 ;
        }
        if(this.USERCOMMAND.isCreatePermitted())
        {
            UserPermissionObject.userCommands.Write = 1 ;
        }

        return UserPermissionObject ;
    }
   
}

module.exports = { permission } ;