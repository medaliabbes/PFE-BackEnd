const userCommandController = require('./../controllers/usercommand.controller') ;
const router = require('express').Router() ;


router.post('/'      , userCommandController.Create) ;

router.get('/'       , userCommandController.ReadAll);

router.get('/:id'    , userCommandController.Read) ;

router.put('/:id'    , userCommandController.Update) ;

router.delete('/:id' , userCommandController.Delete) ;

router.get('/:id/device' , userCommandController.GetDeviceCommand) ;

router.get('/:id/zone'   , userCommandController.GetZoneCommands) ;

router.get('/:id/user'   , userCommandController.GetUserCommand) ;

module.exports = router ;


