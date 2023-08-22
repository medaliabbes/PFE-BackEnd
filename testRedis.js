
/**
 * to start redis server : redis-server
 */

const redis = require("redis");

//let redisClient = redis.createClient();

async function nodeRedisDemo() {
    const client = redis.createClient();
    await client.connect();
  /*
    await client.zAdd('mlist', [
     
      {
        score: 101,
        value: 'One Hundred and One'
      }
    ]);*/
    //await client.lPush('testingl' , "hello") ;
    //await client.lPop('testingl' );
    await client.lRem('64d7dc22ed015d061f656f95' , 1 ,'{"deviceid":"64d7dc22ed015d061f656f95","sensor":"humidity","threshold":66,"userid":"64d6061b9e71cdea4baf15fe"}') ;
    const ret = await client.lRange('64d7dc22ed015d061f656f95' , 0,-1) ;
    console.log(ret) ;
    console.log(ret.length);
    /*for  await (const ele of client.lRange('testingl' , 0,-1)){
      console.log(ele) ;
    }*/
    let i = 1 ;
    // Get all of the values/scores from the sorted set using
    // the scan approach:
    // https://redis.io/commands/zscan
    for await (const memberWithScore of client.zScanIterator('mlist')) {
      //await client.zRem('mysortedset' , memberWithScore) ;
      console.log(memberWithScore);
      i++;
    }

    await client.quit();  
}

nodeRedisDemo();