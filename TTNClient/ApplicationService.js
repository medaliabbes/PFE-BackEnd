
const ApplicationRegistryService  = require('./ApplicationRegistry') ;


class ApplicationService{

    constructor(token)
    {
        this.AppService = new ApplicationRegistryService(token) ;
        this.token = token ;
    }

    async Get(appid){
        const res = await this.AppService.Get(appid) ;
        return res ;
    }

    async Create(app){
        const res = await this.AppService.Create(app.id , app.name , app.collaboratorid) ;
        return res ; 
    }

    async Delete(appid){
        const res = await this.AppService.Delete(appid) ;
        return res ;
    }

    async Purge(appid){
        const res = await this.AppService.Purge(appid);
        return res ; 
    }

    async List(){
        const ListOfApp = await this.AppService.List() ;
        return ListOfApp ;
    }

    async CreateApiKey(CreateappReq){
        const apiKey = await this.AppService.CreateApiKey(CreateappReq) ;
        return apiKey ;
    }

    async getListApiKey(appid){
        const key = await this.AppService.getListKey(appid) ;
        return key ;
    }
}

module.exports = ApplicationService ;