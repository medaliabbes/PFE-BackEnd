const userCommandService  = require('./../services/usercommand.service') ;


const Create = async (req , res) => {
    try{
        const command = req.body ;
        const ret = await userCommandService.Create(command) ;
        res.status(201).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}

const Update = async (req , res) => {
    try{
        const id = req.params.id ;
        const command = req.body ;
        const ret = await userCommandService.Update(id , command) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}

const Delete = async (req , res) => {
    try{
        const id = req.params.id ;
        const ret = await userCommandService.Delete(id) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}

const Read = async (req , res) => {
    try{
        const id = req.params.id ;
        const ret = await userCommandService.Read(id) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}

const GetUserCommand  = async (req , res) => {
    try{
        const userid = req.params.id ;
        const ret = await userCommandService.findUserCommand(userid) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}

const GetZoneCommands = async (req , res) => {
    try{
        const zoneid = req.params.id ;
        const ret = await userCommandService.findZoneCommand(zoneid) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}

const GetDeviceCommand = async(req , res) => {
    try{
        const deviceid = req.params.id ;
        const ret = await userCommandService.findDeviceCommand(deviceid) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({message : error}) ;
    }
}

module.exports = { Create , Update , Delete , Read ,
                   GetUserCommand , GetZoneCommands , GetDeviceCommand };