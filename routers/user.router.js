

const router               = require('express').Router() ;
const UserController       = require('./../controllers/user.controller');

/**
 * Example on how this should work :
 * the request will reaches the router where it will passed to the middleware to check 
 * authorization ,if it is authorized it will be passed to the controller where the logic 
 * will happen if not an error will be return to the client 
 * 
 * router.method('/path' , middleware ,controller) ; 
 */

router.post('/' , UserController.Create ) ;

router.get('/'  , UserController.GetUserAddedBy ) ;//UserController.ReadAll) ;

router.get('/permissions'   , UserController.MyPermission) ;

//Only for test purposes
router.get('/all' , UserController.ReadAll) ;

router.get('/:id' , UserController.Read) ;

router.put('/:id' , UserController.Update) ;

router.delete('/:id'    , UserController.Delete) ;

router.get('/:id/zones' , UserController.GetListZone) ;

router.get('/:id/permissions' , UserController.GetPermission ) ;


module.exports = router ;
