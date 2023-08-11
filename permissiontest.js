const permissionmodule = require('./middlewares/permission.middleware') ;


let perm = new permissionmodule.permission() ;

perm.ZONES.AllowAll() ;
perm.DEVICES.AllowRead() ;
perm.ALERTS.AllowRead() ;
perm.SCHEDULER.AllowRead() ;
//perm.USERS.AllowRead() ;

console.log(perm.getPermissionCode().toString()) ;

