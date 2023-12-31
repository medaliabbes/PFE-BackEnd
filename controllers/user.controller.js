
//const userModel = require('../models/user.model');
const UserService = require('./../services/user.service') ;
const permissionmodule  =  require('./../middlewares/permission.middleware') ;

/**
 * create user request body
 * {
    "firstname": "user2",
    "lastname": "muser2",
    "phonenumber" : "+21600000000" ,
    "email": "user2.muser@gmail.com",
    "password" : "rtyu1254PO#" ,
    "permissionlevel": {
        "zones" : {
            "Read" : 0 ,
            "Write": 0
        },
        "users" : {
            "Read" : 1 ,
            "Write": 0
        },
        "alerts" : {
            "Read" : 1 ,
            "Write": 1
        },
        "schedulers" : {
            "Read" : 1 ,
            "Write": 0
        },
        "devices" : {
            "Read" : 1 ,
            "Write": 0
        },
        "userCommands" :{
            "Read" : 1 ,
            "Write": 0
        }
    }
}
 */
/**
 * Controller should parse the request data and pass objects to the service
 * 
 */
const Create = async (req , res) => {
    try
    {
        let user = req.body ;
        const u = await UserService.GetUserByEmail(user.email) ;
        console.log(u) ;
        if(u == null) 
        {
            let ret = await UserService.Create(user) ;
            console.log(ret) ;
            res.status(201).json(ret) ;
        }
        else{
            res.status(200).json({message : 'user Exist'}) ;
        }
    }catch(e)
    {
        console.error(e);
        res.status(500).json({error : e}) ;
    }

}


const Update = async (req , res) => {
    try{
        let userID   = req.params.id ;
        let user     = req.body      ;

        const checkUser = await UserService.Read(userID) ;
        console.log("user id :" , checkUser) ;
        if(checkUser != null)
        {
            console.log("update") ;
            const ret = await UserService.Update(userID , user) ;
            res.status(200).json(ret) ;
        }
        else{
            console.log("user dosn't exist") ;
            res.status(200).json({message : "user dosn't exist"}) ;
        }
    }catch(e)
    {
        console.error(e) ;
        res.status(500).json({error : e}) ;
    }

}

const Delete = async (req , res) => {
    try{
        const userID = req.params.id ;

        let ret = await UserService.Delete(userID) ;
        res.status(200).json(ret) ;

    }catch(e)
    {
        res.status(500).json({error : e}) ;
    }
}

const Read   = async (req , res) => {
    try{
        const userID = req.params.id ;

        let ret = await UserService.Read(userID) ;

        const permission  = new permissionmodule.permission(ret.permissionLevel);

        const userpermssion = permission.GetPermissionObject() ;

        ret.permissionLevel = userpermssion ;

        let user = {
                    _id : ret._id ,
                    firstname  : ret.firstname , 
                    lastname   : ret.lastname  ,
                    email      : ret.email ,
                    permission : userpermssion ,
                    phone      : ret.phone
                } ;
        if(ret.phone != null && ret.phone != undefined)
        {
        	user.phone      = ret.phone ;
        }

        res.status(200).json(user) ;
        //res.status(200).json(ret) ;
    }catch(e)
    {
       res.status(500).json({error : e}) ; 
    }
}

const ReadAll = async (req , res) =>{
    try{
        const users = await UserService.ReadAll() ;

        res.status(200).json(users) ;
 
    }catch(e)
    {
        res.status(500).json({error : e}) ;
    }
}

const GetUserAddedBy = async (req , res) => {

    try{
        console.log("GetUserAddedby");
        const users = await UserService.GetAddById(req.user.id) ;
        
        const permission  = new permissionmodule.permission();

        let listOfUsers = [] ;

        users.forEach((user) => {
            
            permission.setPermissionCode(user.permissionLevel) ;

            const userpermssion = permission.GetPermissionObject() ;

            //ret.permissionLevel = userpermssion ;
            //console.log(user) ;
            let myuser = {_id : user._id ,
                        //name  : user.name , 
                        firstname  : user.firstname , 
                        lastname   : user.lastname  ,
                        email : user.email ,
                        phone : user.phone ,
                        permission : userpermssion} ;
            //console.log("myuser :" , myuser) ;
            listOfUsers.push(myuser) ;
        });
        //console.log(listOfUsers) ;
        res.status(200).json(listOfUsers) ;

        //res.status(200).json(users) ;
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

const GetListZone = async(req , res) =>{
    try{
        const id = req.params.id ;
        const ret = await UserService.GetListOfZones(id); 
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}

const GetPermission = async(req , res) =>
{
    try{
        //const userid = req.user.id ; //carful with this : it has been changed in middleware

        const userid = req.params.id ; 
        
        const user   = await UserService.Read(userid) ;

        const permission  = new permissionmodule.permission(user.permissionLevel);

        const ret = permission.GetPermissionObject() ;

        res.status(200).json(ret) ;

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json({message : e}) ;
    }
    
}

const MyPermission = async (req , res) =>{
    try{
        //const userid = req.user.id ; //carful with this : it has been changed in middleware

        const userid = req.user.id ;//req.params.id ; 
        
        const user   = await UserService.Read(userid) ;

        const permission  = new permissionmodule.permission(user.permissionLevel);

        const ret = permission.GetPermissionObject() ;

        res.status(200).json(ret) ;

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json({message : e}) ;
    }
}

module.exports = { Create , Update , Delete , Read ,
                   ReadAll , GetListZone , GetUserAddedBy ,GetPermission ,MyPermission} ;

                   
