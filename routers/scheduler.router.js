

const SchedulerController   = require('./../controllers/scheduler.controller') ;
const router  = require('express').Router() ;


/**
 * Contoller should by protected by middleware 
 * 
 */

//for exemple to secure create method , the middleware need to check if the zoneid 
//of the scheduler belong the user making the request 
router.post('/' , SchedulerController.Create) ;

router.get('/' ,SchedulerController.ReadAll ) ;

router.put('/:id' , SchedulerController.Update) ;

router.delete('/:id' , SchedulerController.Delete) ;

router.get('/:id' , SchedulerController.Read) ;


/*
router.get('/:id/devices' , SchedulerController.GetDeviceSheduler) ;

router.get('/:id/zones' , SchedulerController.GetZoneSheduler) ;
*/

module.exports = router ;