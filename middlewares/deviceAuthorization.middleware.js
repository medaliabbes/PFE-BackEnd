
const permissionmodule  =  require('./permission.middleware') ;



const deviceAuthorization   = async (req , res , next) => {
    try{

        console.log("user :",req.user) ;

        const permissionCode = req.user.iam ; 

        console.log(permissionCode) ;

        let userpermission = new permissionmodule.permission(permissionCode) ;

        if(req.method === 'GET')//read
        {
            //console.log('myget');
            if(userpermission.DEVICES.isReadPermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === 'DELETE')//delete
        {
            if(userpermission.DEVICES.isDeletePermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === 'POST')//create
        {
            if(userpermission.DEVICES.isCreatePermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else if(req.method === 'PUT')//update
        {
            //console.log("put req") ;
            //console.log(userpermission.DEVICES.isUpdatePermitted() ) ;

            if(userpermission.DEVICES.isUpdatePermitted() == true)
            {
                console.log("req Permitted") ;
                next() ;
            }
            else{
                console.log("Unauthorized Request") ;
                res.status(401).json({message : "Unauthorized Request"}) ;
            }
        }
        else{
            console.log("Unauthorized Request") ;
            res.status(401).json({message : "Unauthorized Request"}) ;
        }
        //console.log(req.method) ;
        //next() ;
        
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const devicePostAuthorization = async(req , res , next ) => {
    try{
        if(req.user.addby != null)
        {
            req.user.id = req.user.addby ; 
        }
        next() ;
    }catch(e)
    {
        console.log(e) ; 
        res.status(500).json(e) ;
    }
}


module.exports = { deviceAuthorization , devicePostAuthorization } ;