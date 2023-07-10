

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
const DeviceRouter      = require('./routers/device.router') ;


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

app.use('/api/v1/users'       , UserRouter) ;

app.use('/api/v1/zones'       , ZoneRouter) ;

app.use('/api/v1/scheduler'   , SchedulerRouter) ;
 
app.use('/api/v1/usercommand' , UserCommandRouter);

app.use('/api/v1/device'      , DeviceRouter) ;


app.listen(process.env.APP_PORT , ()=>{
    console.log("Server Running on port :" , process.env.APP_PORT) ;
}) ;