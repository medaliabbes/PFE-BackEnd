
const mongoose    = require("mongoose") ;
const userService = require("./../services/user.service") ; 
/**
 * this middleware will receive user info from front-end including email
 * and generate a jwt 
 */


const authenticateUser = async (req , res , next) => {
    

}

module.exports = authenticateUser ;
