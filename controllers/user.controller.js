
const userModel = require('../models/user.model');
const UserService = require('./../services/user.service') ;


/**
 * to add user 
 * {
    "email" : "test2@gmail.com",
    "name"  : "test2" ,
    "password" : "dali1997" ,
    "permissionLevel" : 16777215
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
        res.status(200).json(ret) ;
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
        const users = await UserService.GetAddById(req.user.id) ;
        res.status(200).json(users) ;
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


module.exports = { Create , Update , Delete , Read ,
                   ReadAll , GetListZone , GetUserAddedBy } ;

                   