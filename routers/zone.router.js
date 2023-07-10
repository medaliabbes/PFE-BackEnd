

const ZoneController = require('./../controllers/zone.controller') ;
const router         = require('express').Router() ;

/**
 * @Note Authorization middleware should be added here
 */
router.post('/'      , ZoneController.Create) ;

router.get('/'       , ZoneController.GetAll ) ;

router.get('/:id'    , ZoneController.Read)   ;

router.put('/:id'    , ZoneController.Update) ;

router.delete('/:id' , ZoneController.Delete) ;

router.get('/:id/devices'    , ZoneController.GetListOfDevices) ;

router.get('/:id/schedulers' , ZoneController.GetListOfScheduler) ;


module.exports = router ;