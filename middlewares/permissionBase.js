

const permission = require('./ResourcePermission') ;

const RESOURCES = permission.RESOURCES ;
const PERMISSIONS = permission.CRUD_PERMISSION ;

class PermissionBase{

    constructor()
    {
        this.permissionCode = 0;
        this.resource = -1 ;
    } 

    setResource(resource)
    {
        this.resource = resource ;
        return this ;
    }

    setPermissionCode(permissionCode)
    {
        this.permissionCode = permissionCode;
        return this ;
    }

    getPermissionCode()
    {
        return this.permissionCode ;
    }

    isReadPermitted()
    {
        return permission.isReadPermitted(this.permissionCode , this.resource) ;
    }

    isCreatePermitted()
    {
        return permission.isCreatePermitted(this.permissionCode , this.resource) ;
    }

    isDeletePermitted()
    {
        return permission.isDeletePermitted(this.permissionCode , this.resource) ;
    }

    isUpdatePermitted()
    {
        return permission.isUpdatePermitted(this.permissionCode , this.resource) ;
    }
    
    AllowRead()
    {
        this.permissionCode |= permission.setPermission(this.resource , 
                                                        permission.CRUD_PERMISSION.READ) ;
        return this ;
    }

    AllowCreate()
    {
        this.permissionCode |= permission.setPermission(this.resource , 
            permission.CRUD_PERMISSION.CREATE) ;
        return this ;
    }

    AllowDelete()
    {
        this.permissionCode |= permission.setPermission(this.resource , 
            permission.CRUD_PERMISSION.DELETE) ;
        return this ;
    }

    AllowUpdate()
    {
        this.permissionCode |= permission.setPermission(this.resource , 
            permission.CRUD_PERMISSION.UPDATE) ;
        return this ;
    }

    AllowAll()
    {
        this.permissionCode |= permission.setPermission(this.resource , 
            permission.CRUD_PERMISSION.ALL) ;
        return this ;
    }

    

}

module.exports = { PermissionBase , RESOURCES , PERMISSIONS} ;