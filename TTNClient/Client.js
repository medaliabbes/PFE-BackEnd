

const request = require('request');


class Client{

    constructor(host , baseUrl , path , token)
    {
        this.host    = host    ; 
        this.baseUrl = baseUrl ;
        this.path    = path ;
        this.token   = token ;
    }

    setHost(host)
    {
        this.host = host ;
    }

    setBaseUrl(baseUrl)
    {
        this.baseUrl = baseUrl ;
    }

    setPath(path)
    {
        this.path = path ;
    }

    setToken(token)
    {
        this.token = token ;
        return this; 
    }

    getRequestParam()
    {
        if(this.token == undefined ||this.path == undefined ||
             this.baseUrl == undefined || this.host == undefined )
        {
            return null ;
        }

        let ReqParam = 
        {
            url : 'https://' + this.host + '/' + this.baseUrl + '/' + this.path ,
            headers : {
                'host': this.host ,
                'Authorization' : 'Bearer '+ this.token  ,
                'Content-Type': 'application/json',
            }
        }

        return ReqParam ;
    }

    getRequestParam(requestBody)
    {
        if(this.token == undefined ||this.path == undefined ||
            this.baseUrl == undefined || this.host == undefined )
        {
            return null ;
        }

       let ReqParam = 
       {
           url : 'https://' + this.host + '/' + this.baseUrl + '/' + this.path ,
           headers : {
               'host': this.host ,
               'Authorization' : 'Bearer '+ this.token  ,
               'Content-Type': 'application/json',
           } ,
           body : requestBody ,
       }

       return ReqParam ;
    }

    get()
    {
        if(this.getRequestParam() == null)
        {
            console.log("Client getRequestParam() returned null") ;
            return ;
        }

        let reqParam = this.getRequestParam() ;

        let promise = new Promise(function(resolver , rejecter)
        {
            request.get(reqParam , function(err , resp)
            {
                if(err)
                {
                    rejecter(err) ;
                }
                else{
                    resolver( resp) ;
                }
            }) ;
        }) ;

        return promise ;
    }

    post( param )
    {
        if(this.getRequestParam() == null)
        {
            console.log("Client getRequestParam() returned NULL") ;
            return ;
        }

        let reqParam =  this.getRequestParam(param) ;

        let promise = new Promise(function(resolver , rejecter)
        {
            request.post(reqParam , function(err , resp)
            {
                if(err)
                {
                    rejecter(err) ;
                }
                else{
                    resolver( resp) ;
                }
            }) ;
        }) ;

        return promise ; 
    }

    delete()
    {
        if(this.getRequestParam() == null)
        {
            console.log("Client getRequestParam() returned NULL") ;
            return ;
        }
        

        let reqParam = this.getRequestParam() ;

        let promise = new Promise(function(resolver , rejecter)
        {
            request.delete(reqParam , (err , resp) => {
                if(err)
                {
                    rejecter(err) ;
                }
                else{
                    resolver(resp) ;
                }
            }) ;
        });
        
        return promise ;
    }

    put()
    {

    }

}

module.exports = Client ;
