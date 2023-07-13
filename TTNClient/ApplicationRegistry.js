
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

        super.setPath(`organizations/${appCreateRequest.collaborator.organization_ids.organization_id}/applications`) ;

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

    setToken(token)
    {
        super.setToken(token) ;
    }

}

module.exports =  ApplicationRegistryService;

