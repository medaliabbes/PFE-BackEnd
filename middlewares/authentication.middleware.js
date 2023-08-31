
const userService = require("../services/user.service") ; 
const bcrypt      = require('bcrypt');
const jwt         = require('jsonwebtoken') ;

//Unothorized error code 401 

/**
 * this middleware will validate the token send by the client 
 */
const authenticateUser = async (req , res , next) => {
    
    try{
        if (req.headers && req.headers.authorization && 
            req.headers.authorization.split(' ')[0] === 'JWT') 
            {
                //console.log("verifier token : ",req.headers.authorization.split(' ')[1] );
                const decode = await jwt.verify(req.headers.authorization.split(' ')[1],
                    process.env.JWT_SECRET);
                //console.log("decode : " , decode) ;
                req.user = decode ; 
        
                next() ;
            } 
    }catch(e)
    {
        res.status(500).json({message : e}) ;
    }
}


/**
 * login will check user existance in the database and generate a token 
 */
const login = async (req , res , next) => {
    
    try{
        const email    = req.body.email ;
        
        const password = req.body.password ;

        console.log(req.body) ;

        let user = await userService.GetUserByEmail(email) ;
        
        if(bcrypt.compareSync(password , user.password))
        {
            //user exist ==> generate a jwt and return it to frontend 
            let token = jwt.sign({id : user._id , iam : user.permissionLevel , 
                                  addby : user.addby} , 
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

/**
 * registre will add user if dosn't exist 
 */
const registre = async(req , res , next ) => {
    try{
        const user = req.body ;
        //console.log(user);
        //check if the email is used 
        const checkuser = await userService.GetUserByEmail(user.email) ;
        
        console.log("checkuser :" ,checkuser) ;
        
        if(checkuser != null )
        {
            //user has a account 
            res.status(200).json({message : "user exist"}) ;
        }
        else{
            //hash the password 
            user.password = bcrypt.hashSync(user.password , 8);
            //allow all permission for registre user 
            user.permissionLevel = 0xffffff ;
            //
            user.addby = null ;
            //save user to database
            const ret = await userService.Create(user) ;

            res.status(200).json(ret) ;
        }    
    }
    catch(e)
    {
        console.log(e) ;
        res.status(500).json({message : e}) ;
    }
}

const testMiddleware = (req , res) => {
    res.status(200).json({message : "success"}) ;
}

module.exports = { authenticateUser, login, registre, testMiddleware };
