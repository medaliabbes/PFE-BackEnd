const router  = require('express').Router() ;
const DeviceLogController = require('./../controllers/deviceLog.controller') ;

router.get('/' , DeviceLogController.ReadAll) ;

//get device log by id
router.get('/:id' , DeviceLogController.GetDeviceLog) ;

router.post('/:id' ,DeviceLogController.GetDeviceLogByDate ) ;

router.delete('/all'  , DeviceLogController.DeleteAll) ;

module.exports = router ;