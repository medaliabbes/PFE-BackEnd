
/**
 * this file will lunch a worker for every application
 */

const { workerData, 
        parentPort, 
        isMainThread,
        Worker }  
            = require("worker_threads");


/**
 * the script need to read all application from database then create 
 * a worker for every application
 */


const LuncherWorker = new Worker("./worker/AlertWorker.js", {workerData: 
                    {
                        app_id  : "test1" ,
                        app_key : "mykey" ,
                        app_num :  1
                    }});

                    
LuncherWorker.on("message", msg => console.log(`Worker message received: ${msg}`));

LuncherWorker.on("error", err => console.error(err));

LuncherWorker.on("exit", code => console.log(`Worker exited with code ${code}.`));

