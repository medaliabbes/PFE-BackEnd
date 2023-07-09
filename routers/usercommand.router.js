const userCommandController = require('./../controllers/usercommand.controller') ;
const router = require('express').Router() ;


router.post('/'      , userCommandController.Create) ;

router.get('/:id'    , userCommandController.Read) ;

router.put('/:id'    , userCommandController.Update) ;

router.delete('/:id' , userCommandController.Delete) ;

router.get('/device/:id' , userCommandController.GetDeviceCommand) ;

router.get('/zone/:id'   , userCommandController.GetZoneCommands) ;

router.get('/user/:id'   , userCommandController.GetUserCommand) ;

module.exports = router ;


