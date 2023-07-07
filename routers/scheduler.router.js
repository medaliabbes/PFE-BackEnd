

const SchedulerController   = require('./../controllers/scheduler.controller') ;
const router  = require('express').Router() ;


/**
 * Contoller should by protected by middleware 
 * 
 */

//for exemple to secure create method , the middleware need to check if the zoneid 
//of the scheduler belong the user making the request 
router.post('/' , SchedulerController.Create) ;

router.put('/:id' , SchedulerController.Update) ;

router.delete('/:id' , SchedulerController.Delete) ;

router.get('/:id' , SchedulerController.Read) ;

router.get('/devices/:id' , SchedulerController.GetDeviceSheduler) ;

router.get('/zones/:id' , SchedulerController.GetZoneSheduler) ;

module.exports = router ;