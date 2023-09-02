
let Client = require("./Client")

class ApplicationRegistryService extends Client {

    constructor(token)
    {
        super() ;
        super.setHost('eu1.cloud.thethings.network') ;
        super.setBaseUrl('api/v3') ;
        super.setToken(token) ;
    }
    
    Create(CreateApplicationRequest )
    {
        super.setPath(`organizations/${CreateApplicationRequest.collaborator.organization_ids.organization_id}/applications`) ;

        let Req = JSON.stringify(CreateApplicationRequest) ;

        return super.post(Req) ;
    }

    Create(appId , appName , collaboratorId)
    {
        let appCreateRequest = {   
            application  :
            {
                ids :
                {
                    application_id :appId
                },
                name :appName
            },
            collaborator :
            {
                organization_ids: 
                {
                    organization_id : collaboratorId
                }
            }
        } ;

        super.setPath(`users/${appCreateRequest.collaborator.organization_ids.organization_id}/applications`) ;

        appCreateRequest = JSON.stringify(appCreateRequest) ;
        
        return super.post(appCreateRequest) ;
    }

    Get(ApplicationId)
    {
        super.setPath(`applications/${ApplicationId}`) ;

        return super.get() ;
    }

    List()
    {
        super.setPath('applications') ;

        return super.get() ;
    }

    Delete(ApplicationId)
    {
        super.setPath(`applications/${ApplicationId}`) ;

        return super.delete() ;
    }

    Purge(ApplicationId)
    {
        super.setPath(`applications/${ApplicationId}/purge`) ;

        return super.delete() ;
    }

    CreateApiKey(CreateappReq)
    {
        super.setPath(`applications/${CreateappReq.application_ids.application_id}/api-keys`) ;
        console.log(JSON.stringify( CreateappReq ) );
        return super.post(JSON.stringify( CreateappReq )) ;
    }

    setToken(token)
    {
        super.setToken(token) ;
    }

    getListKey(appid ){

        super.setPath(`applications/${appid}/api-keys`) ;

        return super.get() ;
    }
}

module.exports =  ApplicationRegistryService;