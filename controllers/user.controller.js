
const userModel = require('../models/user.model');
const UserService = require('./../services/user.service') ;

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
        res.status(500).json({message : e}) ;
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
        res.status(500).json({message : e}) ;
    }

}

const Delete = async (req , res) => {
    try{
        const userID = req.params.id ;

        let ret = await UserService.Delete(userID) ;
        res.status(200).json(ret) ;

    }catch(e)
    {
        res.status(500).json({message : e}) ;
    }
}

const Read   = async (req , res) => {
    try{
        const userID = req.params.id ;
        let ret = await UserService.Read(userID) ;
        res.status(200).json(ret) ;
    }catch(e)
    {
       res.status(500).json({message : e}) ; 
    }
}

const ReadAll = async (req , res) =>{
    try{
        const users = await UserService.ReadAll() ;
        res.status(200).json(users) ;
    }catch(e)
    {
        res.status(500).json({message : e}) ;
    }
}

module.exports = { Create , Update , Delete , Read , ReadAll} ;