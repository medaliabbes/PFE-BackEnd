

const PermissionModule = require('./permissionBase') ;
/**
 * @Note to add a new resource go to ResourcePermission.js add the resource name to
 *       RESOURCES struct and set the resource code ,then create a new PermissionBase 
 *       variable in this class with the resource name 
 */

class permission {
    DEVICES   = new PermissionModule.PermissionBase() ;
    ZONES     = new PermissionModule.PermissionBase() ;
    USERS     = new PermissionModule.PermissionBase() ;
    ALERTS    = new PermissionModule.PermissionBase() ;
    SCHEDULER = new PermissionModule.PermissionBase() ;

    constructor(permissionCode = 0)
    {
        this.DEVICES.setResource(PermissionModule.RESOURCES.DEVICES).setPermissionCode(permissionCode) ;
        this.ZONES.setResource(PermissionModule.RESOURCES.ZONES).setPermissionCode(permissionCode) ;
        this.USERS.setResource(PermissionModule.RESOURCES.USERS).setPermissionCode(permissionCode) ;
        this.ALERTS.setResource(PermissionModule.RESOURCES.ALERTS).setPermissionCode(permissionCode) ;
        this.SCHEDULER.setResource(PermissionModule.RESOURCES.SCHEDULER).setPermissionCode(permissionCode) ; 
    }

    getPermissionCode()
    {
        let pCode = this.DEVICES.getPermissionCode() | this.ALERTS.getPermissionCode() |
                    this.USERS.getPermissionCode() | this.ZONES.getPermissionCode() |
                    this.SCHEDULER.getPermissionCode() ;
        return pCode ;
    }

    setPermissionCode(pCode)
    {
        this.DEVICES.setPermissionCode(pCode) ;
        this.USERS.setPermissionCode(pCode) ;
        this.SCHEDULER.setPermissionCode(pCode) ;
        this.ZONES.setPermissionCode(pCode) ;
        this.ALERTS.setPermissionCode(pCode) ;
    }
}

module.exports = { permission } ;