

/**
 * Controller should parse the request data and pass objects to the service
 * 
 */

const Create = async (req , res) => {
    console.log("Create Controller");
    res.status(201).json({ message : 'user Created'}) ;
}

const Update = async (req , res) => {
    
}

const Delete = async (req , res) => {
    
}

const Read   = async (req , res) => {
    
}

const ReadAll = async (req , res) =>{
    console.log("ReadAll Controller");
    res.status(201).json({ message : 'users'}) ;
}

module.exports = { Create , Update , Delete , Read , ReadAll} ;