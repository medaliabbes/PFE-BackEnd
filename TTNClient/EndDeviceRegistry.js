
const Client = require('./Client') ;

class EndDeviceRegistryService extends Client{

    constructor(ApiKey)
    {
        super() ;
        super.setHost('eu1.cloud.thethings.network') ;
        super.setBaseUrl('api/v3') ;
        super.setToken(ApiKey) ;
    }

    //AddDevice 
    Create(appId , devID , joinEui , devEui  , devicename)
    {
        let EndDeviceCreateRequest = {
            end_device : {
                ids : {
                    device_id : devID,
                    dev_eui   : devEui,
                    join_eui  : joinEui , 
                } ,
                name : devicename ,
                join_server_address : 'eu1.cloud.thethings.network' ,
                network_server_address : 'eu1.cloud.thethings.network',
                application_server_address : 'eu1.cloud.thethings.network',
                lorawan_version : 1,
                frequency_plan_id : "EU_863_870_TTN"
            } ,
            field_mask : {
                paths : [
                  "name" ,
                  "join_server_address",
                  "network_server_address",
                  "application_server_address",
                  "ids.dev_eui",
                  "ids.join_eui"
                ]
              }
        } ;

        super.setPath(`applications/${appId}/devices`) ;

        EndDeviceCreateRequest = JSON.stringify(EndDeviceCreateRequest);
        return super.post(EndDeviceCreateRequest) ;                
    }

    //GetDeviceById
    Get(appId , DevID)
    {
        super.setPath(`applications/${appId}/devices/${DevID}`) ;
        return super.get() ;
    }

    //GetListOfDevices
    List(appId)
    {
        super.setPath(`applications/${appId}/devices`) ;
        return super.get() ;
    }

    //DeleteDevice 
    Delete(appId , DevID)
    {   
        super.setPath(`applications/${appId}/devices/${DevID}`)
        return super.delete() ;
    }   


}

module.exports = EndDeviceRegistryService ;
