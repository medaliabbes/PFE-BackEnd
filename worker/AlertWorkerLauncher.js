
/**
 * this file will lunch a worker for every application
 */

require('dotenv').config() ;
const {workerData,parentPort,isMainThread,Worker }   = require("worker_threads");
const zoneservice = require('./../services/zone.service') ;
const mongoose    = require('mongoose')  ;


//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI ,
    {
      useNewUrlParser    : true     ,
      useUnifiedTopology : true     ,
    }
  );


var ZoneWorkerCounter = 0 ;

async function getApplicationList(){

    const applicationList = await zoneservice.ReadAll() ;

    for( let i = 0 ; i< applicationList.length ; i++)
    {
      //check ttnid and apikey 
      if(applicationList[i].ttnid != undefined && applicationList[i].apikey != undefined)
      {
        //console.log(` ${ZoneWorkerCounter} ,ttnId : ${applicationList[i].ttnid} ,api ${applicationList[i].apikey}`) ;
        ZoneWorkerCounter++;
        //start a worker to read application mqtt data
        new Worker("./worker/AlertWorker.js", {workerData: 
              {
                  app_id  : applicationList[i].ttnid ,
                  app_key : applicationList[i].apikey ,
                  app_num : ZoneWorkerCounter
              }});
      }
        
    }
}

getApplicationList() ;

/**
 * the script need to read all application from database then create 
 * a worker for every application
 */

/*
const LuncherWorker = new Worker("./worker/AlertWorker.js", {workerData: 
                    {
                        app_id  : "test1" ,
                        app_key : "mykey" ,
                        app_num :  1
                    }});

                    
LuncherWorker.on("message", msg => console.log(`Worker message received: ${msg}`));

LuncherWorker.on("error", err => console.error(err));

LuncherWorker.on("exit", code => console.log(`Worker exited with code ${code}.`));
*/
