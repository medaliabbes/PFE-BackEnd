
const permissionmodule  =  require('./permission.middleware') ;


const zoneAuthorization     = async (req , res , next) => {
    try{
        console.log("user :",req.user) ;

        console.log(req.user.id) ;

        const permissionCode = req.user.iam ;

        let userpermission   = new permissionmodule.permission(permissionCode) ;

        if(req.method === "POST") 
        {
            if(userpermission.ZONES.isCreatePermitted()==true)
            {
                console.log("POST Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "GET")
        {
            if(userpermission.ZONES.isReadPermitted()==true)
            {
                console.log("GET Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "PUT")
        {
            if(userpermission.ZONES.isUpdatePermitted()==true)
            {
                console.log("PUT Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === "DELETE")
        {
            if(userpermission.ZONES.isDeletePermitted()==true)
            {
                console.log("DELETE Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else{
            console.log("unknown error ") ;
        }

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
} 

const zonePostAuthorization = (req , res , next) =>{
    try{

        if(req.user.addby != null)
        {
            req.user.id = req.user.addby ; 
        }

        if(req.method ==="POST")
        {
            req.body.userid = req.user.id ;
        }
        
        next() ;
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

module.exports = { zoneAuthorization , zonePostAuthorization } ;