

const ZoneController = require('./../controllers/zone.controller') ;
const router         = require('express').Router() ;


const middleware = (req , res , next )=>{
    req.params.id = "1";
    console.log("Play with request") ;
    next() ;
}

/**
 * @Note Authorization middleware should be added here
 * Also , an API controller can be added ,to handle interaction with ttn api 
 * before saving the data .
 */
router.post('/'      , ZoneController.Create) ;

router.get('/'       , ZoneController.GetAll );

router.get('/:id'    , ZoneController.Read)   ;

router.put('/:id'    , ZoneController.Update) ;

router.delete('/:id' , ZoneController.Delete) ;

router.get('/:id/devices'    , ZoneController.GetListOfDevices) ;

router.get('/:id/schedulers' , ZoneController.GetListOfScheduler) ;


module.exports = router ;