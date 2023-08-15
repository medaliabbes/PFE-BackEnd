

const bcrypt            =  require('bcrypt');
const userService       =  require('./../services/user.service') ;
const deviceService     =  require('./../services/device.service') ;
const zoneService       =  require('./../services/zone.service') ;
const permissionmodule  =  require('./permission.middleware') ;


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


module.exports = { alertAuthorization , commandAuthorization } ;