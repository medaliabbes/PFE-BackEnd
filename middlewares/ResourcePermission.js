
/*
    permission level :  
                    C	R	U	D
        devices 	1	1	1	1		
        zones 		1	1	1	1
        users 		1	1	1	1
        scheduler	1	1	1	1
        alerts		1	1	1	1	
*/

const RESOURCES = {
    DEVICES   : 0 , 
    ZONES     : 4 ,
    USERS     : 8 ,
    SCHEDULER : 12 ,
    ALERTS    : 16 ,
    LAST      : 17
} ;

const CRUD_PERMISSION = {
    CREATE : 0x8 ,
    READ   : 0x4 ,
    UPDATE : 0x2 ,
    DELETE : 0x1 ,
    ALL    : 0xf  
} ;


/**
 *  pass the resource and the permission to this function and it will return
 * a number corresponding to that permission that number will be saved in the database
 * @param {*} resource   : resource to be permitted 
 * @param {*} permission : Create , Read ,Update and Delete
 * @returns 
 */
function setPermission(resource , permission)
{
    if(permission > CRUD_PERMISSION.ALL || permission < 0)
    {
        throw new Error('there is no such permission') ;
    }
    if(resource >= RESOURCES.LAST || RESOURCES < 0 )
    {
        throw new Error("Resource dosn't exist") ;
    }

    permission = permission << resource ;
    return permission ; 
}


function isCreatePermitted(permissionCode , resource) 
{
    if(permissionCode > 0xfffff || permissionCode < 0)
    {
        throw new Error("Error permission code");
    }
    else if(resource >= RESOURCES.LAST || resource < 0)
    {
        throw new Error("Resource dosn't exist") ;
    }
    else{
        let ret = ( permissionCode >> resource ) & CRUD_PERMISSION.CREATE ;
        if(ret > 0)
        return true ;
        else return false ;
    }
}

function isReadPermitted(permissionCode  , resource)
{
    if(permissionCode > 0xfffff || permissionCode < 0)
    {
        throw new Error("Error permission code");
    }
    else if(resource >= RESOURCES.LAST || resource < 0)
    {
        throw new Error("Resource dosn't exist") ;
    }
    else{
        let ret = ( permissionCode >> resource ) & CRUD_PERMISSION.READ ;
        if(ret > 0)
        return true ;
        else return false ;
    }
}

function isUpdatePermitted(permissionCode  , resource)
{
    if(permissionCode > 0xfffff || permissionCode < 0)
    {
        throw new Error("Error permission code");
    }
    else if(resource >= RESOURCES.LAST || resource < 0)
    {
        throw new Error("Resource dosn't exist") ;
    }
    else{
        let ret = ( permissionCode >> resource ) & CRUD_PERMISSION.UPDATE ;
        if(ret > 0)
        return true ;
        else return false ;
    }
}

function isDeletePermitted(permissionCode  , resource) 
{
    if(permissionCode > 0xfffff || permissionCode < 0)
    {
        throw new Error("Error permission code");
    }
    else if(resource >= RESOURCES.LAST || resource < 0)
    {
        throw new Error("Resource dosn't exist") ;
    }
    else{
        let ret = ( permissionCode >> resource ) & CRUD_PERMISSION.DELETE ;
        if(ret > 0)
        return true ;
        else return false ;
    }
}


module.exports = { setPermission     , isCreatePermitted , isReadPermitted ,
                   isDeletePermitted , isUpdatePermitted , RESOURCES       ,
                   CRUD_PERMISSION } ;
