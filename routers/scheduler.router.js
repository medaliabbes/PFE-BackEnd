

const SchedulerController   = require('./../controllers/scheduler.controller') ;
const router  = require('express').Router() ;



router.post('/' , SchedulerController.Create) ;

router.put('/:id' , SchedulerController.Update) ;

router.delete('/:id' , SchedulerController.Delete) ;

router.get('/:id' , SchedulerController.Read) ;

router.get('/devices/:id' , SchedulerController.GetDeviceSheduler) ;

router.get('/zones/:id' , SchedulerController.GetZoneSheduler) ;

module.exports = router ;