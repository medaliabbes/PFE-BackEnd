

require('dotenv').config()
const mongoose                    = require('mongoose')  ;
const cors                        = require('cors') ;
const express                     = require('express')   ;
const app                         = express() ;
const UserRouter                  = require('./routers/user.router') ;
const DeviceRouter                = require('./routers/device.router') ;
const SchedulerRouter             = require('./routers/scheduler.router') ;
const ZoneRouter                  = require('./routers/zone.router') ;
const AlertRouter                 = require('./routers/alert.router') ;
const UserCommandRouter           = require('./routers/usercommand.router') ;
const authentication              = require('./middlewares/authentication.middleware') ;
const deviceAuthorizationModule   = require('./middlewares/deviceAuthorization.middleware') ;
const zoneAuthorizationModule     = require('./middlewares/zoneAuthorization.middleware') ;
const userAuthorizationModule     = require('./middlewares/userAuthorization.middleware') ;
const schedulerAuthorizatinModule = require('./middlewares/schedulerAuthorization.middleware');
const userCommandAuthorizationModule = require('./middlewares/userCommandAuthorization.middleware') ;
const alertAuthorizationModule    = require('./middlewares/alertAuthorization.middleware') ;
//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI ,
    {
      useNewUrlParser    : true     ,
      useUnifiedTopology : true     ,
    }
  );


app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

//testing end point (remove in production)
app.use('/api/v1/auth' , authentication.authenticateUser , authentication.testMiddleware) ;

app.use('/api/v1/registre' , authentication.registre) ;

//this route return JWT in case the user existe 
app.use('/api/v1/login'       , authentication.login)  ;

app.use('/api/v1/users'       , authentication.authenticateUser ,userAuthorizationModule.userAuthorization , userAuthorizationModule.userPostAuthorization , UserRouter) ;

app.use('/api/v1/zones'       , authentication.authenticateUser ,zoneAuthorizationModule.zoneAuthorization, zoneAuthorizationModule.zonePostAuthorization , ZoneRouter) ;

app.use('/api/v1/scheduler'   , authentication.authenticateUser , schedulerAuthorizatinModule.schedulerAuthorization , schedulerAuthorizatinModule.schedulerPostAuthorization , SchedulerRouter) ;
 
app.use('/api/v1/usercommand' , authentication.authenticateUser , userCommandAuthorizationModule.commandAuthorization , userCommandAuthorizationModule.commandPostAuthorization ,UserCommandRouter);

app.use('/api/v1/devices'     , authentication.authenticateUser , deviceAuthorizationModule.deviceAuthorization, deviceAuthorizationModule.devicePostAuthorization ,DeviceRouter) ;

app.use('/api/v1/alerts'      , authentication.authenticateUser , alertAuthorizationModule.alertAuthorization , alertAuthorizationModule.alertPostAuthorization,  AlertRouter) ;

app.get('/endpoint' , function(req , res) {
  console.log("Server working") ;
  res.status(200).json({message :"serverWorking"}) ;
});

app.listen(process.env.APP_PORT , ()=>{
    console.log("Server Running on port :" , process.env.APP_PORT) ;
}) ;

/*
    {
        "email" : "hamma1@gmail.com",
        "name"  : "dali1" ,
        "password" : "dali1997" ,
        "permissionLevel" : 278772
    }
*/