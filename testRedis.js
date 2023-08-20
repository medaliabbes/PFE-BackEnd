

const redis = require("redis");;

//let redisClient = redis.createClient();

async function nodeRedisDemo() {
  try {
    const client = redis.createClient();
    await client.connect();
   
    let st = await client.set('mydata' ,JSON.stringify( {name : 'mohamed'}) ) ;
    console.log("st :",st);
    console.log(typeof(st)) ;
    
    let data = await client.get('mydata') ;
    console.log(data);
    await client.quit();
  } catch (e) {
    console.error(e);
  }
}

nodeRedisDemo();