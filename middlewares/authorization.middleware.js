

const bcrypt        = require('bcrypt');
const userService   = require('./../services/user.service') ;

const deviceAuthorization   = (req , res , next) => {
    try{
        if(req.method === 'GET')
        {
            console.log('myget');
        }
        else if(req.method === 'DELETE')
        {

        }
        else if(req.method === 'POST')
        {
            
        }
        else if(req.method === 'PUT')
        {
            
        }
        console.log(req.method) ;
        next() ;
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const zoneAuthorization     = (req , res , next) => {
    try{

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
} 

const userAuthorization     = (req , res , next) => {
    try{

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