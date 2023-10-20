const Redis = require("ioredis");
const redis = new Redis();

async function main() {
  const numbers = ['a','b','c'];
  
  //await redis.lpush("user-list", numbers);

  //const popped = await redis.lpop("user-list");
  //console.log(popped); // 9

  //let all = await redis.lrange("user-list", 0, -1);
  //console.log(all);

  //await redis.lrem("user-list" ,0, 'c') ;

  let listkey = "Sat-10:59" ;//"Sun-10:00" ;

  //"deviceTTNid": "eui-123456789abbdeff",

  all = await redis.lrange(listkey, 0, -1);

  console.log(all);

  //all = await redis.del(listkey);
  //console.log(all) ;
  
  //const pers =  await redis.get("persistency-test") ;

 // console.log(pers) ;
}

main();