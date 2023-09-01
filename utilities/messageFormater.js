


class LoraFormater{

    #length = 0 ;
    #buffer = null ;

    constructor(len = 4 ){
        this.#length = len ;
        this.#buffer = new Buffer.alloc(len+1) ;
        this.#buffer[0] = len ;
    }
   

    setOutputPinState(pin , state){
        if(pin>4 || pin < 1)
        {
            throw new Error("Pin out of range") ;
        }

        if(state === "on"){
            this.#buffer[pin] = 1 ;
        }
        else if(state === "off")
        {
            this.#buffer[pin] = 0 ;
        }
        
    }

    getPacket(){
        return this.#buffer ;
    }

    getPayloadString64()
    {
        return Buffer.from(this.#buffer).toString('base64') ;   
    }

    destructor(){
        this.#buffer = null ;
    }
}

module.exports =  LoraFormater  ;

/*
let m = new LoraFormater() ;
m.setOutputPinState(1 , 1) ;
console.log("packet :" , m.getPacket() ) ;

console.log("pay :" , m.getPayloadString64() ) ;
*/