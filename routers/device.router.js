
const deviceController   = require('./../controllers/device.controller') ;
const router             = require('express').Router() ;


router.post('/' , deviceController.Create )  ; 

router.get('/:id' ,deviceController.Read)    ;

router.put('/:id' , deviceController.Update) ;

router.get('/:id/alerts' , deviceController.GetListOfAlerts) ;

router.get('/:id/schedulers' , deviceController.GetListOfSchedulers) ;

router.delete('/:id' , deviceController.Delete) ;

module.exports = router ;

