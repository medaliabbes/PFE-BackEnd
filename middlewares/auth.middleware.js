
//const mongoose    = require("mongoose") ;
const userService = require("./../services/user.service") ; 
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken') ;

//Unothorized error code 401 

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const authenticateUser = async (req , res , next) => {
    
    try{
        
    }catch(e)
    {
        
    }
}



const login = async (req , res , next) => {
    
    try{
        const email    = req.body.email ;
        //file:///home/dali/Desktop/nodeTuto/crud/Middelwares/users.middleware.js
        
        const password = req.body.password ;

        let user = await userService.GetUserByEmail(email) ;

        if(bcrypt.compareSync(password , user.password))
        {
            //user exist ==> generate a jwt and return it to frontend 
            let token = jwt.sign({id : user._id , iam : user.permissionLevel} , 
                        process.env.JWT_SECRET , {expiresIn: 2400 }) ;
            res.status(200).json({message : "success" , accessToken : token}) ;
        }
        else{
            
            res.status(401).json({message : "user dosn't exist"}) ;
        }

    }catch(e)
    {
        console.error(e) ;
        res.status(500).json({message : e}) ;
    }
}


const registre = async(req , res , next ) => {
    try{
        const user = req.body ;
        
        const checkuser = await userService.GetUserByEmail(user.email) ;
        
        console.log("checkuser :" ,checkuser) ;
        
        if(checkuser != null )
        {
            //user has a account 
            res.status(200).json({message : "user exist"}) ;
        }
        else{
            //const ret = await userService.Create(user) ;
            res.status(200).json(ret) ;
        }
        

    }catch(e)
    {
        console.log(e) ;
        res.status(500).json({message : e}) ;
    }
}

module.exports = { authenticateUser , login , registre };
