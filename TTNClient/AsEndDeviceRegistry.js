
const Client = require('./Client') ;

class AsEndDeviceRegistryService extends Client{

    constructor(ApiKey)
    {
        super() ;
        super.setBaseUrl('api/v3') ;
        super.setHost('eu1.cloud.thethings.network') ;
        super.setToken(ApiKey) ;
    }

    //AddDevice 
    Set(appId ,devId ,joinEui , devEui)
    {
        
        let SetRequest = {
            end_device: {
                ids: {
                  device_id: devId,
                  dev_eui: devEui,
                  join_eui: joinEui
                } ,
              },
              field_mask : {
                paths : [
                  "ids.device_id",
                  "ids.dev_eui",
                  "ids.join_eui"
                ]
              }
            
        } ;

        SetRequest = JSON.stringify(SetRequest) ;

        super.setPath(`as/applications/${appId}/devices`) ;

        return super.post(SetRequest) ;
    }

    //DeleteDevice 
    Delete(appid , devid)
    {
      super.setPath(`as/applications/${appid}/devices/${devid}`);
      return super.delete() ;
    }

    //GetDeviceById
    Get(appId , devId)
    {
        super.setPath(`applications/${appId}/devices/${devId}`) ;

        return super.get() ;
    }


}

module.exports = AsEndDeviceRegistryService ;