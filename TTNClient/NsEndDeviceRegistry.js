
const Client  = require('./Client' ) ;

class NsEndDeviceRegistryService extends Client {

    constructor(ApiKey)
    {
        super() ;
        super.setBaseUrl('api/v3') ;
        super.setHost('eu1.cloud.thethings.network') ;
        super.setToken(ApiKey) ;
    }

    //CreateDevice Add
    Create(appId ,devId,  joinEui , devEui )
    {
        let SetEndDeviceRequest = {
            end_device: {
                supports_join: true,
                lorawan_version: "1.0.0",
                ids: {
                  device_id: devId   ,
                  dev_eui  : devEui  ,
                  join_eui : joinEui ,
                },
                lorawan_phy_version: "1.0.0",
                frequency_plan_id : "EU_863_870_TTN"
            },
            field_mask : {
                paths : [
                  "supports_join",
                  "lorawan_version",
                  "ids.device_id",
                  "ids.dev_eui",
                  "ids.join_eui",
                  "lorawan_phy_version",
                  "frequency_plan_id"
                ]
              }
        } ;
        
        SetEndDeviceRequest = JSON.stringify(SetEndDeviceRequest) ;

        super.setPath(`ns/applications/${appId}/devices`) ;
        
        return super.post(SetEndDeviceRequest) ;
    }

    Delete(appid , devid)
    {
      super.setPath(`ns/applications/${appid}/devices/${devid}`) ;
      return super.delete() ;
    }
    
}

module.exports = NsEndDeviceRegistryService ;
