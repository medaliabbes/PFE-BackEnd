const permissionmodule = require('./middlewares/permission.middleware') ;


let perm = new permissionmodule.permission() ;

perm.ZONES.AllowAll() ;
perm.DEVICES.AllowRead() ;
perm.ALERTS.AllowRead() ;
perm.SCHEDULER.AllowRead() ;
perm.USERS.AllowRead() ;
perm.USERCOMMAND.AllowAll() ;

console.log(perm.getPermissionCode().toString(16)) ;

