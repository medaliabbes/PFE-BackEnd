

const EndDeviceRegistryService   = require('./EndDeviceRegistry')   ;
const JsEndDeviceRegistryService = require('./JsEndDeviceRegistry') ;
const NsEndDeviceRegistryService = require('./NsEndDeviceRegistry') ;
const AsEndDeviceRegistryService = require('./AsEndDeviceRegistry') ;



class DevicesService {

    constructor(token)
    {
        this.setToken(token) ;
    }

    setToken(token)
    {
        this.token = token ;
        this.IdentityService = new EndDeviceRegistryService().setToken(token) ;
        this.JoinService     = new JsEndDeviceRegistryService().setToken(token);
        this.NsService       = new NsEndDeviceRegistryService().setToken(token) ;
        this.AppService      = new AsEndDeviceRegistryService().setToken(token) ;
    }
    /**
     * this function Registre enddevice to Identity Server , join server ,network server
     * and application server 
     * @param {*} device { appid , id , eui , join , appkey , name } 
     * @returns true if device registred ,otherwise false 
     */
    async Create (device) {
        
        let res = await this.IdentityService.Create(device.appid , device.id , device.join ,device.eui , device.name) ; 
        
        if(res.statusCode != 200) 
        {
            console.log("error : " ,res.body ) ;
            return false;
        }

        res    = await this.JoinService.Set(device.appid , device.id , device.join , device.eui , device.appkey) ;

        if(res.statusCode != 200) 
        {
            console.log("error : " ,res.body ) ;
            return false;
        }

        res   = await this.NsService.Create(device.appid , device.id , 				device.join ,device.eui) ;

        if(res.statusCode != 200) 
        {
            console.log("error : " ,res.body ) ;
            return false;
        }

        res   = await this.AppService.Set(device.appid , device.id , device.join ,device.eui) ;

        if(res.statusCode != 200) 
        {
            console.log("error : " ,res.body ) ;
            return false;
        }

        return true ; 
    }

    async Delete(appid , devid)
    {
        let res = await this.AppService.Delete(appid , devid) ;
        console.log(`${res.statusCode} : ${res.body}`) ;

        res = await this.NsService.Delete(appid , devid) ;
        console.log(`${res.statusCode} : ${res.body}`) ;

        res = await this.JoinService.Delete(appid , devid) ;
        console.log(`${res.statusCode} : ${res.body}`) ;

        res = await this.IdentityService.Delete(appid , devid) ;
        console.log(`${res.statusCode} : ${res.body}`) ;
    }

    Update(id , newDevice)
    {

    }

    Get(id)
    {

    }
}

let myDevService = new DevicesService() ;

module.exports =  myDevService; 
