
const mongoose = require('mongoose') ;
const UserModel = require('./../models/user.model') ;

/**
 * All access to the database should be from service layer 
 * all modules of service layer should provide the flowwing functions :
 *          - Create()
 *          - Update()
 *          - Delete()
 *          - Read()
 * 
 * other functions that are required or needed by other modules can be added
 * 
 * 
 * 
 */

async function Create(user)
{
    return await UserModel.create(user) ;
}

async function Update(id , user)
{
    return await UserModel.findByIdAndUpdate(id,user) ; 
}

async function Delete(id)
{
    return await UserModel.findByIdAndDelete(id) ;
}

async function Read(id)
{
    return await UserModel.findById(id) ;
}

async function ReadAll() 
{
    return await UserModel.find() ;
}

async function GetAddById(id)
{
    return await UserModel.find({addby : id}) ;
} 

async function GetUserByEmail(email)
{
    return await UserModel.findOne({email : email}) ;
}


module.exports = { Create , Update , Delete , Read , ReadAll , GetAddById , GetUserByEmail } ;

