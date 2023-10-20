

let date = new Date() ;
/*
const m = date.getMonth() ;
date.setMonth(m+1) ;

let isoStr = date.toISOString() ;
isoStr = isoStr.split('.')[0]+'Z' ;
console.log(isoStr) ;
console.log( Math.floor(date.valueOf()/1000))

*/

console.log(date.getTime()); 

let date1 = new Date(date.getTime()+ 30*60000) ;

console.log( date1.getTime() ) ;

console.log(date1) ;
console.log(date) ;

let m = date.getMinutes() ;
let h = date.getHours()   ;

console.log(`minutes ${m} , hours ${h}` ) ;

/*
let date = new Date() ;

let timenow = date.getTime() ;
date.setTime(timenow + 10) ;
timenow = date.getTime() ;
var now = Math.floor(timenow/1000);
console.log(now) ;
*/

/*
1696253042
1693663363
*/