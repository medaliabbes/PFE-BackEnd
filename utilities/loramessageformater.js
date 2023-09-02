class LoRaMessageFormatter {
   
    DATA_MASK = {
        OUTPUT        :   (0x01 << 7),
        INPUT  :   (0x01 << 6),
        CURRENT      :   (0x01 << 5),
        VOLTAGE       :   (0x01 << 4),
        INVERTER  :   (0x01 << 3),
        TEMPERATURE   :   (0x01 << 2),
    } ;

    #InputPinState  = null ;
    #OutputPinState = null ;
    #BatteryCurrent = null ;
    #BatteryVoltage = null ;
    #Temperature    = null ;
    #InverterState  = null ;
    #MessageBuffer  = null ;


    //buffer of type Buffer Uint8
    constructor(buffer)
    {
        this.#InputPinState  = null;
        this.#OutputPinState = null;
        this.#BatteryCurrent = null;
        this.#BatteryVoltage = null;
        this.#Temperature    = null;
        this.#InverterState  = null;
        if(buffer != undefined)
        {
            this.#MessageBuffer = buffer ;
            this.Deserialize() ;
        }
       
    }

    setInputPinState(state)
    {
       
        this.#InputPinState = state ;
    }


    setOutputPinState(pin , st)
    {
        let state = 0 ;
        if(st === 'on')
        {
            state = 1 ;
        }
        

        if(this.#OutputPinState == null)
        {
            this.#OutputPinState = state << pin;
        }
        else
        {
            this.#OutputPinState |= state << (pin ) ;
        }
       
    }

    setBatteryCurrent(current)
    {
        this.#BatteryCurrent = current;
    }

    setBatteryVoltage(volt)
    {
        this.#BatteryVoltage = volt;
    }

    setTemperature(temp)
    {
        this.#Temperature    = temp;
    }

    setInverterState(state)
    {
        this.#InverterState  = state;
    }


    getInputPinState()
    {

    }

    getOutputPinState()
    {

    }

    getBatteryCurrent()
    {
        return this.#BatteryCurrent ;
    }

    getBatteryVoltage()
    {
        return this.#BatteryVoltage ;
    }

    getTemperature()
    {
        return this.#Temperature ;
    }

    getInverterState()
    {
        return this.#InverterState ;
    }

    //return buffer type
    Serialize()
    {
        let arr    = []  ;
        let length = 2   ;
        arr.push(0)      ;
        arr.push(length) ;

        if(this.#InputPinState != null)
        {
            arr[0] |= this.DATA_MASK.INPUT ;
            arr.push(this.#InputPinState ) ;
            length++ ;
        }

        if(this.#OutputPinState != null)
        {
            arr[0] |= this.DATA_MASK.OUTPUT ;
            arr.push(this.#OutputPinState) ;
            length++;
        }

        if(this.#BatteryCurrent != null)
        {
            let buffer = Buffer.alloc(4) ;
            buffer.writeFloatLE(this.#BatteryCurrent) ;

            arr[0] |= this.DATA_MASK.CURRENT ;
            arr.push(buffer[0]) ;
            arr.push(buffer[1]) ;
            arr.push(buffer[2]) ;
            arr.push(buffer[3]) ;
            length += 4 ;
        }

        if(this.#BatteryVoltage != null)
        {
            let buffer = Buffer.alloc(4) ;
            buffer.writeFloatLE(this.#BatteryVoltage) ;

            arr[0] |= this.DATA_MASK.VOLTAGE ;
            arr.push(buffer[0]) ;
            arr.push(buffer[1]) ;
            arr.push(buffer[2]) ;
            arr.push(buffer[3]) ;
            length += 4 ;
        }

        if(this.#Temperature != null)
        {
            let buffer = Buffer.alloc(4) ;
            buffer.writeFloatLE(this.#Temperature) ;

            arr[0] |= this.DATA_MASK.TEMPERATURE ;
            arr.push(buffer[0]) ;
            arr.push(buffer[1]) ;
            arr.push(buffer[2]) ;
            arr.push(buffer[3]) ;
            length += 4 ;
        }

        if(this.#InverterState != null)
        {
            arr[0] |= this.DATA_MASK.INVERTER ;
            arr.push(this.#InverterState) ;
            length++ ;
        }

        if(length != arr.length)
        {
            console.error("Serialize()")
        }
        arr[1] = length ;
   
        return arr ;
    }


    Deserialize()
    {
        if(this.#MessageBuffer == null)
        {
            return ;
        }

        let header = this.#MessageBuffer[0] ;
        let length = this.#MessageBuffer[1] ;

        //Empty Packet
        if(length === 2) return ;

        length-- ;

        if((header & this.DATA_MASK.INVERTER) != 0)
        {
            this.#InverterState = this.#MessageBuffer[length] ;
        }

        if((header & this.DATA_MASK.TEMPERATURE) != 0)
        {
            length -= 4 ;
            this.#Temperature = this.#MessageBuffer.readFloatLE(length);
        }

        if((header & this.DATA_MASK.VOLTAGE) != 0)
        {
            length -= 4 ;
            this.#BatteryVoltage = this.#MessageBuffer.readFloatLE(length) ;
        }

        if((header & this.DATA_MASK.CURRENT) != 0)
        {
            length -= 4 ;
            this.#BatteryCurrent = this.#MessageBuffer.readFloatLE(length) ;
        }

        if((header & this.DATA_MASK.OUTPUT) != 0)
        {
            length--;
            this.#OutputPinState = this.#MessageBuffer[length] ;
        }

        if((header & this.DATA_MASK.INPUT) != 0)
        {
            length--;
            this.#InputPinState = this.#MessageBuffer[length] ;
        }

    }
}

module.exports =  LoRaMessageFormatter ;

/*
/*
let m = new LoRaMessageFormatter() ;

m.setOutputPinState(1 , 1) ;
m.setOutputPinState(2 , 0) ;
m.setOutputPinState(3 , 0) ;
m.setOutputPinState(4 , 1) ;
m.setBatteryCurrent(23.2)  ;
m.setBatteryVoltage(13.3)  ;
m.setTemperature(25.22)     ;
m.setInverterState(1)      ;

let packet = m.Serialize() ;

strBase64 = Buffer.from(packet).toString('base64') ;

console.log(packet)     ;
console.log("strBase64  :",strBase64)  ;

let rxArray = packet    ;

rxArray = Buffer.from(rxArray) ;

let recv = new LoRaMessageFormatter(rxArray)      ;

console.log("temp   :" , recv.getTemperature())   ;
console.log("b Curr :" ,recv.getBatteryCurrent()) ;
console.log("b volt :" ,recv.getBatteryVoltage()) ;

*/
