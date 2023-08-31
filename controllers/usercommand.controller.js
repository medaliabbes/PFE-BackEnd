
const userCommandService  = require('./../services/usercommand.service') ;
const deviceService       = require('./../services/device.service') ;

const Create = async (req , res) => {
    try{
        const command = req.body ;
        //when Controlling a single device 
        if(command.deviceid )
        {
            const device = await deviceService.Read(command.deviceid) ;
            
            console.log(device) ;

            console.log("MQTT Integration Should be here : ",device.eui) ;
        }

        const ret = await userCommandService.Create(command) ;

        res.status(201).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}


//remove this method 
const Update = async (req , res) => {
    try{
        const id = req.params.id ;
        const command = req.body ;
        const ret = await userCommandService.Update(id , command) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
    }
}

//remove this 
const Delete = async (req , res) => {
    try{
        const id = req.params.id ;
        const ret = await userCommandService.Delete(id) ;
        res.status(200).json(ret) ;
    }catch(error)
    {
        console.log(error) ;
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
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
        res.status(500).json({error : error}) ;
    }
}

const ReadAll = async(req , res )=>{
    try{
        const commands = await userCommandService.GetAllCommand() ;
        res.status(200).json(commands) ;
    }catch(e)
    {
        console.log(e) ;
        res.status(500).json(e) ;
    }
}

module.exports = { Create , Update , Delete , Read , ReadAll ,
                   GetUserCommand , GetZoneCommands , GetDeviceCommand };