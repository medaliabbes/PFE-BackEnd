

const router               = require('express').Router() ;
const UserController       = require('./../controllers/user.controller');
/**
 * Example on how this should work :
 * the request will reashes the router where it will passed to the middleware to check 
 * authorization ,if it is authorized it will be passed to the controller where the logic 
 * will happen if not an error will be return to the client 
 * 
 * router.method('/path' , middleware ,controller) ; 
 */

router.post('/' , UserController.Create ) ;

router.get('/'  , UserController.ReadAll) ;

//router.get('/:id' ,) ;

//router.put('/:id' , ) ;

//router.delete('/:id' , ) ;


module.exports = router ;