const router  = require('express').Router() ;
const DeviceLogController = require('./../controllers/deviceLog.controller') ;

router.get('/' , DeviceLogController.ReadAll) ;

//get device log by id
router.get('/:id' , DeviceLogController.GetDeviceLog) ;

router.post('/:id' ,DeviceLogController.GetDeviceLogByDate ) ;

router.get('/:id/:count' , DeviceLogController.GetDeviceLogCount) ;

router.delete('/all'  , DeviceLogController.DeleteAll) ;

//can add select by number of sample (ex : last n samples )

module.exports = router ;