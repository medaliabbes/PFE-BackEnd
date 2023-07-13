
const Client = require('./Client') ;

class JsEndDeviceRegistryService extends Client {
    
    constructor(ApiKey)
    {
        super() ;
        super.setBaseUrl('api/v3') ;
        super.setHost('eu1.cloud.thethings.network') ;
        super.setToken(ApiKey) ;
    }

    //AddDevice 
    Set(appId ,DevID ,joinEui , devEui ,appkey)
    {
        super.setPath(`js/applications/${appId}/devices`) ;       
        let SetEndDeviceRequest = {
            end_device : {
                ids: {
                  device_id: DevID,
                  dev_eui: devEui,
                  join_eui: joinEui
                },
                network_server_address: "thethings.example.com",
                application_server_address: "thethings.example.com",
                lorawan_version : 1,
                frequency_plan_id : "EU_863_870_TTN" ,
                root_keys: {
                  app_key: {
                    key: appkey
                  }
                }
            } ,
            field_mask : {
                 paths : [
                  "network_server_address",
                  "application_server_address",
                  "ids.device_id",
                  "ids.dev_eui",
                  "ids.join_eui",
                  "root_keys.app_key.key"
                ]
              }
        }

        SetEndDeviceRequest = JSON.stringify(SetEndDeviceRequest) ;

        return super.post(SetEndDeviceRequest) ;
    }

    Delete(appid , devid)
    {
       super.setPath(`js/applications/${appid}/devices/${devid}`) ;
       return super.delete() ;
    }

}


module.exports = JsEndDeviceRegistryService ;