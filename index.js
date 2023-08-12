

require('dotenv').config()
const mongoose          = require('mongoose')  ;
const cors              = require('cors') ;
const express           = require('express')   ;
const app               = express() ;
const UserRouter        = require('./routers/user.router') ;
const DeviceRouter      = require('./routers/device.router') ;
const SchedulerRouter   = require('./routers/scheduler.router') ;
const ZoneRouter        = require('./routers/zone.router') ;
const UserCommandRouter = require('./routers/usercommand.router') ;
const authentication    = require('./middlewares/authentication.middleware') ;
const authorization     = require('./middlewares/authorization.middleware') ;


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

//testing end point 
app.use('/api/v1/auth' , authentication.authenticateUser , authentication.testMiddleware) ;

app.use('/api/v1/registre' , authentication.registre) ;

//this route return JWT in case the user existe 
app.use('/api/v1/login'       , authentication.login)  ;

app.use('/api/v1/users'       , authentication.authenticateUser ,authorization.userAuthorization , authorization.userPostAuthorization , UserRouter) ;

app.use('/api/v1/zones'       , authentication.authenticateUser ,authorization.zoneAuthorization, authorization.zonePostAuthorization ,ZoneRouter) ;

app.use('/api/v1/scheduler'   , SchedulerRouter) ;
 
app.use('/api/v1/usercommand' , UserCommandRouter);

app.use('/api/v1/devices'     , authentication.authenticateUser ,authorization.deviceAuthorization, DeviceRouter) ;

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